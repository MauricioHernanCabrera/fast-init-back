const Mailgun = require("mailgun-js");

const sendEmail = ({ config, defaultFrom }) =>
  /**
   * @param {{ to: string, from: string, subject: string, html: string, text: string }} mailOptions
   */
  (mailOptions) => {
    return new Promise(async (res, rej) => {
      const mailgun = new Mailgun(config);

      mailgun.messages().send(
        {
          from: defaultFrom,
          ...mailOptions,
        },
        (err, body) => {
          if (err) {
            console.log("got an error: ", err);
          } else {
            console.log({ body });
          }
        }
      );

      return res(true);
    });
  };

module.exports = sendEmail;
