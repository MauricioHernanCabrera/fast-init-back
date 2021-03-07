const footerTemplate = () => {
  return `
    <mj-section 
      padding-top="16px"
      padding-bottom="16px"
      padding-left="32px"
      padding-right="32px"
      text-align="center"
      background-color="#EEEEEE"
    >
      <mj-column>
        <mj-social
          font-size="12px"
          icon-size="28px"
          mode="horizontal"
          padding="10px 25px"
          align="center"
        >
            <mj-social-element
              name="facebook"
              href="https://www.facebook.com/fast-cash/"
              border-radius="150px"
            >
            </mj-social-element>
          
            <mj-social-element
              name="twitter"
              href="https://twitter.com/fast-cash"
              border-radius="150px"
            >
            </mj-social-element>
          </mj-social>
      </mj-column>
    </mj-section>
  `;
};

module.exports = footerTemplate;
