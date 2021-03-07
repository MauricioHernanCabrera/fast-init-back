const passport = require("passport");
const express = require("express");
const router = express.Router();
const { wrapperResponseMiddleware } = require("wrapper-response");
const { joiValidateSchemaMiddleware } = require("joi-validate-schema");

const authController = require("./auth.controller");
const authDTO = require("./auth.dto");

require("./../../auth/jwt");
require("./../../auth/basic");
require("./../../auth/google");

router
  .get(
    "/login",
    passport.authenticate("basic"),
    wrapperResponseMiddleware(authController.loginUser)
  )
  .post(
    "/refresh",
    joiValidateSchemaMiddleware(authDTO.refreshToken()),
    wrapperResponseMiddleware(authController.refreshToken)
  )
  .post(
    "/logout",
    passport.authenticate("jwt", { session: false }),
    joiValidateSchemaMiddleware(authDTO.logout()),
    wrapperResponseMiddleware(authController.logout)
  )
  .get("/google", passport.authenticate("google", { scope: ["email", "profile"] }))
  .get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    wrapperResponseMiddleware(authController.socialProviderCallback("google"))
  )
  .post(
    "/register",
    joiValidateSchemaMiddleware(authDTO.registerUser()),
    wrapperResponseMiddleware(authController.registerUser)
  );
// .post(
//   "/forgot",
//   joiValidateSchemaMiddleware(authDTO.forgotPassword()),
//   wrapperResponseMiddleware(authController.forgotPassword)
// )
// .get(
//   "/reset/:resetPasswordToken",
//   wrapperResponseMiddleware(authController.getResetPasswordToken)
// )
// .post(
//   "/reset/:resetPasswordToken",
//   joiValidateSchemaMiddleware(authDTO.resetPassword()),
//   wrapperResponseMiddleware(authController.resetPassword)
// );

module.exports = router;
