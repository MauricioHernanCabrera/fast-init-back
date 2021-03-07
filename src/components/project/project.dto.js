const { CrudDTO } = require("crud-component");

const createAppContainer = require("./../../dependencies");
const Joi = createAppContainer().resolve("Joi");

class ProjectDTO extends CrudDTO {
  createOne = () =>
    Joi.object().keys({
      name: Joi.string().required(),
      user: Joi.mongoId().required(),
    });

  updateOne = () =>
    Joi.object().keys({
      name: Joi.string().optional(),
    });
}

const projectDTO = new ProjectDTO();

module.exports = projectDTO;
