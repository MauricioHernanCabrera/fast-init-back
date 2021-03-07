const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth2");

const config = require("./../config");
const authService = require("./../components/auth/auth.service");

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientId,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const userCreated = await authService.registerSocialProvider(
        {
          name: "GOOGLE",
          id: profile.sub,
        },
        {
          email: profile.email,
          picture: profile.picture,
          providers: [
            {
              name: "GOOGLE",
              id: profile.sub,
            },
          ],
        }
      );

      return done(null, userCreated);
    }
  )
);
