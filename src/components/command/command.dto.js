const { CrudDTO } = require("crud-component");

const createAppContainer = require("./../../dependencies");
const Joi = createAppContainer().resolve("Joi");

class CommandDTO extends CrudDTO {
  createOne = () =>
    Joi.object().keys({
      params: Joi.string().optional().allow(""),

      user: Joi.mongoId().required(),
      program: Joi.mongoId().required(),
      project: Joi.mongoId().required(),
    });

  updateOne = () =>
    Joi.object().keys({
      params: Joi.string().optional().allow(""),
      program: Joi.mongoId().optional(),
    });
}

const commandDTO = new CommandDTO();

module.exports = commandDTO;
