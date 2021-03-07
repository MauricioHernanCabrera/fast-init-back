const config = require("./../config");

const layoutEmailTemplate = require("./layouts/email");

/*
  Compile an mjml string
*/
const verifyEmailTemplate = ({ username, token } = {}) => {
  return layoutEmailTemplate(`
    <mj-section
      padding-top="0px"
      padding-bottom="32px"
      padding-left="12px"
      padding-right="12px"
    > 
      <mj-column>
        <mj-text font-size="16px" font-family="Arial" line-height="22px">
          Hola ${username}, has solicitado una verificación de email.
          
          <span style="display: block; padding-bottom: 12px;"></span>
          
          Para activarlo haga clic en el siguiente enlace:

          <span style="display: block; padding-bottom: 12px;"></span>

          <a
            href="${config.frontUrl}/onboarding/verify-email?token=${token}"
            target="_blank"
            style="text-decoration: underline !important; font-family: Arial;"
            class="mj-content"
          >Enlace de verificación de email</a>
        </mj-text>
      </mj-column>
    </mj-section>
  `);
};

module.exports = verifyEmailTemplate;
