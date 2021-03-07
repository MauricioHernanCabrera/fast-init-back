const queryPaginationFormatMiddleware = require("query-pagination-format-middleware");
const { joiValidateSchemaMiddleware } = require("joi-validate-schema");
const { wrapperResponseMiddleware } = require("wrapper-response");
const { crudRouter } = require("crud-component");
const express = require("express");
const router = express.Router();

const createAppContainer = require("./../../dependencies");
const Joi = createAppContainer().resolve("Joi");

const userController = require("./user.controller");
const userDTO = require("./user.dto");

const passport = require("passport");
require("./../../auth/jwt");

router
  .get(
    "/profile",
    passport.authenticate("jwt"),
    wrapperResponseMiddleware(userController.getUserProfile)
  )
  .post(
    "/verify/email",
    joiValidateSchemaMiddleware(userDTO.verifyEmail()),
    wrapperResponseMiddleware(userController.verifyEmail)
  )
  .post(
    "/verify/username",
    joiValidateSchemaMiddleware(userDTO.verifyUsername()),
    wrapperResponseMiddleware(userController.verifyUsername)
  );

// crudRouter(router, userController, {
//   idName: "userId",
//   excludesRoutes: ["createOne", "updateOne", "deleteOne", "reorderAll"],
//   middlewares: {
//     getAll: [
//       //
//       queryPaginationFormatMiddleware,
//     ],
//     getOne: [
//       // auth.jwtAuth(),
//       // auth.isRole(["ROLE_ADMIN"]),
//       joiValidateSchemaMiddleware(Joi.mongoId().label("userId"), "params.userId"),
//     ],
//   },
// });

module.exports = router;
