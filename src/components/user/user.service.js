const { CrudService } = require("crud-component");

const UserModel = require("./models/user.model");

class UserService extends CrudService {
  constructor() {
    super({
      modelName: "UserModel",
      notFoundMessage: "¡No se encontro el usuario!",
    });

    this.UserModel = UserModel;

    this.existDocMessage = "¡No se encontro el usuario!";
    this.notExistDocMessage = "¡El usuario ya existe!";
  }

  formatDoc = ({ _id, email, username, picture, role, createdAt, updatedAt }) => {
    return {
      _id,
      email,
      username,
      picture,
      role,
      createdAt,
      updatedAt,
    };
  };

  selectDoc = "_id email username picture role createdAt updatedAt";

  verifyEmail = async ({ _id = "", email }) => {
    const userFounded = await this.UserModel.findOne({ email, isActive: true });

    if (!userFounded) {
      return Promise.resolve();
    }

    if (String(userFounded._id) === String(_id)) {
      return Promise.resolve();
    }

    return Promise.reject({ status: 400, message: "¡El email ya esta tomado!" });
  };

  verifyUsername = async ({ _id = "", username }) => {
    const userFounded = await this.UserModel.findOne({ username, isActive: true });

    if (!userFounded) {
      return Promise.resolve();
    }

    if (String(userFounded._id) === String(_id)) {
      return Promise.resolve();
    }

    return Promise.reject({
      status: 400,
      message: "¡El nombre de usuario ya esta tomado!",
    });
  };

  existUserByResetPasswordToken = async (
    { resetPasswordToken, resetPasswordExpires },
    { status = 400, message = "¡El token para recuperar contraseña expiro!" } = {}
  ) => {
    const userFounded = await this.UserModel.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gte: resetPasswordExpires },
      isActive: true,
    });

    if (!userFounded) {
      return Promise.reject({
        message,
        status,
      });
    }
  };

  notExistUserByEmail = async (
    email,
    { status = 400, message = "¡El email ya esta tomado!" } = {}
  ) => {
    const userFounded = await this.UserModel.findOne({ email, isActive: true });

    if (userFounded) {
      return Promise.reject({
        message,
        status,
      });
    }
  };

  notExistUserByUsername = async (
    username,
    { status = 400, message = "¡El nombre de usuario ya esta tomado!" } = {}
  ) => {
    const userFounded = await this.UserModel.findOne({ username, isActive: true });

    if (userFounded) {
      return Promise.reject({
        message,
        status,
      });
    }
  };
}

const userService = new UserService();

module.exports = userService;
