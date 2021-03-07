const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "./../.env") });

const config = {
  dev: process.env.NODE_ENV !== "PROD",

  jwt: {
    secret: process.env.JWT_SECRET,
  },

  db: {
    mongoUri: process.env.DB_MONGO_URI,
  },

  frontUrl: process.env.FRONT_URL,

  backUrl: process.env.BACK_URL,

  server: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
  },

  mailgun: {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN || "",
  },

  originsAllow: JSON.parse(process.env.ORIGINS_ALLOW),

  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
};

module.exports = config;
