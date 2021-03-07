const queryPaginationFormatMiddleware = require("query-pagination-format-middleware");
const { joiValidateSchemaMiddleware } = require("joi-validate-schema");
const { crudRouter } = require("crud-component");
const express = require("express");
const router = express.Router();

const createAppContainer = require("./../../dependencies");
const Joi = createAppContainer().resolve("Joi");

const commandDTO = require("./command.dto");
const commandController = require("./command.controller");
const commandFilter = require("./command.filter");

const passport = require("passport");
require("./../../auth/jwt");

crudRouter(router, commandController, {
  idName: "commandId",
  excludesRoutes: ["reorderAll"],
  middlewares: {
    getAll: [
      passport.authenticate("jwt"),
      queryPaginationFormatMiddleware,
      commandFilter.getAll,
    ],
    createOne: [
      passport.authenticate("jwt"),
      commandFilter.createOne,
      joiValidateSchemaMiddleware(commandDTO.createOne()),
    ],
    getOne: [
      passport.authenticate("jwt"),
      joiValidateSchemaMiddleware(Joi.mongoId().label("commandId"), "params.commandId"),
    ],
    updateOne: [
      passport.authenticate("jwt"),
      joiValidateSchemaMiddleware(Joi.mongoId().label("commandId"), "params.commandId"),
      joiValidateSchemaMiddleware(commandDTO.updateOne()),
    ],
    deleteOne: [
      passport.authenticate("jwt"),
      joiValidateSchemaMiddleware(Joi.mongoId().label("commandId"), "params.commandId"),
    ],
    // reorderAll: [
    //   passport.authenticate("jwt"),
    //   joiValidateSchemaMiddleware(Joi.mongoIdList()),
    // ],
  },
});

module.exports = router;
