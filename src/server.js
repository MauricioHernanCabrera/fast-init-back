const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const mongooseConnectDb = require("mongoose-connect-database")(mongoose);
const { notFound } = require("middleware-handle-errors");
const { handleWrapperResponseMiddleware } = require("wrapper-response");

const config = require("./config");
const router = require("./router");

app.use(cors({ credentials: true, origin: config.originsAllow }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

router(app);

app.use("/public", express.static(path.join(__dirname, "./public")));

app.use(handleWrapperResponseMiddleware);
app.use(notFound);

const start = async () => {
  await mongooseConnectDb(config.db);

  app.listen(config.server.port, () =>
    console.log(`Server: http://${config.server.host}:${config.server.port}`)
  );
};

start();
