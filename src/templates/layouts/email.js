const mjml2html = require("mjml");

const headTemplate = require("./../parcials/head");
const headerTemplate = require("./../parcials/header");
const bodyTemplate = require("./../parcials/body");
const footerTemplate = require("./../parcials/footer");

/*
  Compile an mjml string
*/
const layoutEmailTemplate = (content) => {
  return mjml2html(`
    <mjml>
      ${headTemplate()}
    
      ${bodyTemplate(`
        ${headerTemplate()}

        ${content}
      
        ${footerTemplate()}
    `)}
    </mjml>`).html;
};

module.exports = layoutEmailTemplate;
