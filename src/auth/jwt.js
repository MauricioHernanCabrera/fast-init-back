const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

const userService = require("./../components/user/user.service");
const config = require("./../config");

passport.use(
  new Strategy(
    {
      secretOrKey: config.jwt.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (tokenPayload, cb) {
      try {
        await userService.existDoc(tokenPayload.sub);

        cb(null, tokenPayload);
      } catch (error) {
        return cb(
          {
            message: "No se encontro el usuario",
            status: 404,
          },
          false
        );
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
