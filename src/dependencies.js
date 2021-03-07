const { createContainer, asFunction } = require("awilix");
const Joi = require("awesome-joi-helpers")(require("joi"));

const config = require("./config");

const sendEmail = require("./libs/send-email");

const createAppContainer = () => {
  const container = createContainer();

  container.register({
    sendEmail: asFunction(sendEmail).inject(() => ({
      config: config.mailgun,
      defaultFrom: "no-reply@artesan.com",
    })),

    Joi: asFunction(() => Joi),
  });

  return container;
};

module.exports = createAppContainer;
