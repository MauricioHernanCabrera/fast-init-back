const { CrudDTO } = require("crud-component");

const createAppContainer = require("./../../dependencies");
const Joi = createAppContainer().resolve("Joi");

class UserDTO extends CrudDTO {
  verifyEmail = () =>
    Joi.object().keys({
      email: Joi.string().required(),
      _id: Joi.mongoId().optional(),
    });

  verifyUsername = () =>
    Joi.object().keys({
      username: Joi.string().required(),
      _id: Joi.mongoId().optional(),
    });
}

const userDTO = new UserDTO();

module.exports = userDTO;
