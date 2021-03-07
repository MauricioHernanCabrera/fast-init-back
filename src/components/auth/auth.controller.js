const authService = require("./auth.service");
const queryString = require("querystring");
const config = require("./../../config");

class AuthController {
  constructor() {}

  authService = authService;

  loginUser = async (req) => {
    return {
      body: req.user,
      message: "¡Usuario logueado!",
      status: 200,
    };
  };

  registerUser = async ({ body: data }) => {
    return {
      body: await this.authService.registerUser(data),
      message: "¡Usuario registrado!",
      status: 201,
    };
  };

  forgotPassword = async ({ body: data }) => {
    return {
      body: await this.authService.forgotPassword(data),
      message: "¡Te enviamos un mail para que recuperes tu contraseña!",
      status: 200,
    };
  };

  getResetPasswordToken = async ({ params: { resetPasswordToken } }) => {
    return {
      body: await this.authService.getResetPasswordToken(resetPasswordToken),
      message: "¡Usuario recuperado!",
      status: 200,
    };
  };

  resetPassword = async ({ params: { resetPasswordToken }, body: data }) => {
    return {
      body: await this.authService.resetPassword(resetPasswordToken, data),
      message: "¡Contraseña actualizada!",
      status: 200,
    };
  };

  refreshToken = async ({ body: data }) => {
    return {
      body: await this.authService.refreshToken(data),
      message: "¡Toquen regenerado!",
      status: 200,
    };
  };

  logout = async ({ body: data, user }) => {
    return {
      body: await this.authService.logout({ ...data, userId: user.sub }),
      message: "¡Usuario deslogueado!",
      status: 200,
    };
  };

  socialProviderCallback = (provider) => async (req, res) => {
    const query = queryString.encode({
      refreshToken: req.user.refreshToken,
      token: req.user.token,
    });

    return res.redirect(`${config.frontUrl}/onboarding/provider/${provider}?${query}`);
  };

  socialProviderCallback = (provider) => async (req, res) => {
    const query = queryString.encode({
      refreshToken: req.user.refreshToken,
      token: req.user.token,
    });

    return res.redirect(`${config.frontUrl}/login/provider/${provider}?${query}`);
  };
}

const authController = new AuthController();

module.exports = authController;
