 beforeEach(() => {
  cy.visit("http://localhost:5000/", {
    onBeforeLoad(win) {
      cy.stub(win, "open").as("winOpen");
    },
  });
  cy.get('.ant-btn.ant-btn-primary').as("winOpenButton");
}); */

 it("window.open should be called", () => {
  cy.get("@winOpenButton").click();

  cy.get("@winOpen").should("be.called");
});
/it("window.open should be called with correct URL", () => {
    cy.get("@winOpenButton").click();

    cy.get("@winOpen").should("be.calledWith", "https://accounts.google.com/o/oauth2/v2/", "_blank");
  });

describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5000/table/om')
    cy.request({
  method: 'POST',
  url: 'https://www.googleapis.com/oauth2/v4/token',
  body: {
    grant_type: 'refresh_token',
    client_id: Cypress.env('REACT_APP_GOOGLE_CLIENTID'),
    client_secret: Cypress.env('REACT_APP_GOOGLE_CLIENT_SECRET'),
    refresh_token: Cypress.env('GOOGLE_REFRESH_TOKEN'),
  },
}).then(({ body }) => {
  const { id_token } = body
    cy.request('POST', '/api/login', { jwt: id_token })
      .then( ({ body: { accessToken } }) => {
        cy.setCookie('trello_token', accessToken)
      })
})
  })
  it('passes', () => {
    cy.visit('http://localhost:5000/table/om')
    cy.get('.ant-btn.ant-btn-primary').click()})
})




