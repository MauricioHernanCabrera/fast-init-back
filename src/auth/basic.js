const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const authService = require("../components/auth/auth.service");

passport.use(
  new BasicStrategy(async (email, password, cb) => {
    try {
      const data = await authService.loginUser(email, password);

      return cb(null, data);
    } catch (error) {
      cb(error);
    }
  })
);
