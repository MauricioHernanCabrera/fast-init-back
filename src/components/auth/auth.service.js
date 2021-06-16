const randToken = require("rand-token");
const jwt = require("jsonwebtoken");

const config = require("./../../config");
const createAppContainer = require("./../../dependencies");

const userService = require("./../user/user.service");

const UserModel = require("./../user/models/user.model");
const RefreshTokenModel = require("./models/refresh-token.model");

const resetPasswordTemplate = require("../../templates/reset-password");

class AuthService {
  constructor() {
    this.selectDoc = "_id email username roles createdAt updatedAt";
  }

  formatDoc = ({ _id, email, username, roles, createdAt, updatedAt }) => {
    return { _id, email, username, roles, createdAt, updatedAt };
  };

  createRefreshToken = async (userId) => {
    const refreshToken = randToken.uid(256);
    await RefreshTokenModel.create({ user: userId, refreshToken });

    return refreshToken;
  };

  createToken = (data, { expiresIn = "7d" } = {}) => {
    return jwt.sign(
      {
        sub: data._id,
        role: data.role,
      },
      config.jwt.secret,
      {
        expiresIn,
      }
    );
  };

  registerUser = async (data) => {
    await Promise.all([userService.notExistUserByEmail(data.email)]);
    const userCreated = await UserModel.create(data);
    await userCreated.setPassword(data.password);
    return userService.formatDoc(userCreated);
  };

  loginUser = async (username, password) => {
    const userFounded = await UserModel.findOne({ email: username });

    if (!userFounded) {
      return Promise.reject({ status: 401, message: "Usuario o contraseña incorrecto" });
    }

    const areEquals = await userFounded.validPassword(password);

    if (!areEquals) {
      return Promise.reject({ status: 401, message: "Usuario o contraseña incorrecto" });
    }

    const userFormatted = userService.formatDoc(userFounded);
    const refreshToken = await this.createRefreshToken(userFounded._id);

    return {
      refreshToken,
      user: userFormatted,
      token: this.createToken(userFormatted),
    };
  };

  refreshToken = async (data) => {
    const refreshTokenFounded = await RefreshTokenModel.findOne(data);

    if (!refreshTokenFounded) {
      return Promise.reject({ status: 400, message: "Token de refresco invalido" });
    }

    const [refreshToken] = await Promise.all([
      this.createRefreshToken(data.user),
      refreshTokenFounded.remove(),
    ]);

    const userFounded = await UserModel.findOne({ _id: data.user });

    return {
      refreshToken,
      token: this.createToken(userFounded),
    };
  };

  forgotPassword = async ({ email }) => {
    const resetPasswordToken = require("crypto").randomBytes(32).toString("hex");
    const resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await UserModel.updateOne({ email }, { resetPasswordToken, resetPasswordExpires });

    const sendEmail = createAppContainer().resolve("sendEmail");

    await sendEmail({
      to: email,
      subject: "Reiniciar contraseña",
      html: resetPasswordTemplate({ resetPasswordToken }),
    });
  };

  getResetPasswordToken = async (resetPasswordToken) => {
    const resetPasswordExpires = Date.now();

    await userService.existUserByResetPasswordToken({
      resetPasswordToken,
      resetPasswordExpires,
    });

    const userFounded = await UserModel.findOne({ resetPasswordToken });

    return {
      email: userFounded.email,
      _id: userFounded._id,
    };
  };

  resetPassword = async (resetPasswordToken, { password }) => {
    const resetPasswordExpires = Date.now();

    await userService.existUserByResetPasswordToken({
      resetPasswordToken,
      resetPasswordExpires,
    });

    const userFounded = await UserModel.findOne({ resetPasswordToken });

    await userFounded.setPassword(password);
    userFounded.resetPasswordExpires = resetPasswordExpires;

    await userFounded.save();
  };

  logout = async ({ refreshToken, userId }) => {
    const refreshTokenFounded = await RefreshTokenModel.findOne({
      refreshToken,
      user: userId,
    });

    if (!refreshTokenFounded) {
      return;
    }

    await refreshTokenFounded.remove();
  };

  registerSocialProvider = async (provider, data) => {
    const userFounded = await UserModel.findOne({
      providers: { $eq: provider },
    });

    if (userFounded) {
      return {
        user: userFounded,
        refreshToken: await this.createRefreshToken(userFounded._id),
        token: await this.createToken(userFounded),
      };
    }

    const userCreated = await UserModel.create({
      hasVerifiedEmail: true,
      ...data,
    });

    return {
      user: userCreated,
      refreshToken: await this.createRefreshToken(userCreated._id),
      token: await this.createToken(userCreated),
    };
  };
}

const authService = new AuthService();

module.exports = authService;
