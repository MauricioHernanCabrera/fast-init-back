const queryPaginationFormatMiddleware = require("query-pagination-format-middleware");
const { joiValidateSchemaMiddleware } = require("joi-validate-schema");
const { crudRouter } = require("crud-component");
const express = require("express");
const router = express.Router();

const createAppContainer = require("./../../dependencies");
const Joi = createAppContainer().resolve("Joi");

const programDTO = require("./program.dto");
const programController = require("./program.controller");
const programFilter = require("./program.filter");
const programSecurity = require("./program.security");

const passport = require("passport");
require("./../../auth/jwt");

crudRouter(router, programController, {
  idName: "programId",
  excludesRoutes: ["reorderAll"],
  middlewares: {
    getAll: [
      passport.authenticate("jwt"),
      queryPaginationFormatMiddleware,
      programFilter.getAll,
    ],
    createOne: [
      passport.authenticate("jwt"),
      programFilter.createOne,
      joiValidateSchemaMiddleware(programDTO.createOne()),
    ],
    getOne: [
      passport.authenticate("jwt"),
      programSecurity.getOne,
      joiValidateSchemaMiddleware(Joi.mongoId().label("programId"), "params.programId"),
    ],
    updateOne: [
      passport.authenticate("jwt"),
      programSecurity.updateOne,
      joiValidateSchemaMiddleware(Joi.mongoId().label("programId"), "params.programId"),
      joiValidateSchemaMiddleware(programDTO.updateOne()),
    ],
    deleteOne: [
      passport.authenticate("jwt"),
      programSecurity.deleteOne,
      joiValidateSchemaMiddleware(Joi.mongoId().label("programId"), "params.programId"),
    ],
    // reorderAll: [
    //   passport.authenticate("jwt"),
    //   joiValidateSchemaMiddleware(Joi.mongoIdList()),
    // ],
  },
});

module.exports = router;
