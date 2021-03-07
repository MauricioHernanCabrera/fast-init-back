const { CrudDTO } = require("crud-component");

const createAppContainer = require("./../../dependencies");
const Joi = createAppContainer().resolve("Joi");

class AuthDTO extends CrudDTO {
  registerUser = () =>
    Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
    });

  forgotPassword = () =>
    Joi.object().keys({
      email: Joi.string().email().required(),
    });

  resetPassword = () =>
    Joi.object().keys({
      password: Joi.string().required().min(6),
    });

  refreshToken = () =>
    Joi.object().keys({
      refreshToken: Joi.string().required(),
      user: Joi.mongoId().required(),
    });

  logout = () =>
    Joi.object().keys({
      refreshToken: Joi.string().required(),
    });
}

const authDTO = new AuthDTO();

module.exports = authDTO;
