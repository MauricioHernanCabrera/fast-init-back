const config = require("./../config");

const layoutEmailTemplate = require("./layouts/email");

/*
  Compile an mjml string
*/
const resetPasswordTemplate = ({ resetPasswordToken } = {}) => {
  return layoutEmailTemplate(`
    <mj-section
      padding-top="0px"
      padding-bottom="32px"
      padding-left="12px"
      padding-right="12px"
    > 
      <mj-column>
        <mj-text font-size="16px" font-family="Arial" line-height="22px">
          Haga clic en el siguiente enlace o péguelo en su navegador para completar el proceso:
          
          <span style="display: block; padding-bottom: 12px;"></span>
          
          <a
            href="${config.frontUrl}/onboarding/reset-password?resetPasswordToken=${resetPasswordToken}"
            target="_blank"
            style="text-decoration: underline !important; font-family: Arial;"
            class="mj-content"
          >Enlace para restablecer contraseña</a>
        </mj-text>
      </mj-column>
    </mj-section>
  `);
};

module.exports = resetPasswordTemplate;
