const queryPaginationFormatMiddleware = require("query-pagination-format-middleware");
const { joiValidateSchemaMiddleware } = require("joi-validate-schema");
const { crudRouter } = require("crud-component");
const express = require("express");
const router = express.Router();

const createAppContainer = require("./../../dependencies");
const Joi = createAppContainer().resolve("Joi");

const projectDTO = require("./project.dto");
const projectController = require("./project.controller");
const projectFilter = require("./project.filter");
const projectSecurity = require("./project.security");

const passport = require("passport");
require("./../../auth/jwt");

crudRouter(router, projectController, {
  idName: "projectId",
  excludesRoutes: ["reorderAll"],
  middlewares: {
    getAll: [
      passport.authenticate("jwt"),
      queryPaginationFormatMiddleware,
      projectFilter.getAll,
    ],
    createOne: [
      passport.authenticate("jwt"),
      projectFilter.createOne,
      joiValidateSchemaMiddleware(projectDTO.createOne()),
    ],
    getOne: [
      passport.authenticate("jwt"),
      joiValidateSchemaMiddleware(Joi.mongoId().label("projectId"), "params.projectId"),
      projectSecurity.getOne,
    ],
    updateOne: [
      passport.authenticate("jwt"),
      joiValidateSchemaMiddleware(Joi.mongoId().label("projectId"), "params.projectId"),
      joiValidateSchemaMiddleware(projectDTO.updateOne()),
      projectSecurity.updateOne,
    ],
    deleteOne: [
      passport.authenticate("jwt"),
      joiValidateSchemaMiddleware(Joi.mongoId().label("projectId"), "params.projectId"),
      projectSecurity.deleteOne,
    ],
    // reorderAll: [
    //   passport.authenticate("jwt"),
    //   joiValidateSchemaMiddleware(Joi.mongoIdList()),
    // ],
  },
});

module.exports = router;
