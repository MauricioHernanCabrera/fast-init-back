const { CrudDTO } = require("crud-component");

const createAppContainer = require("./../../dependencies");
const Joi = createAppContainer().resolve("Joi");

class ProgramDTO extends CrudDTO {
  createOne = () =>
    Joi.object().keys({
      name: Joi.string().required(),
      url: Joi.string().required(),
      user: Joi.mongoId().required(),
    });

  updateOne = () =>
    Joi.object().keys({
      name: Joi.string().optional(),
      url: Joi.string().optional(),
    });
}

const programDTO = new ProgramDTO();

module.exports = programDTO;
