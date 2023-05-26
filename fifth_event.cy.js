import moment from 'moment';

before('login', function () {
  cy.visit("http://localhost:5000")
  localStorage.setItem("token", '');
  cy.wait(30000).get('.ant-input').click().type('bruce')
  cy.get('.anticon.anticon-search').click()
    .wait(10000)
})

afterEach('clear search by users', () => {
  cy.get('.ant-input-suffix').click()
  .wait(5000)
  })

describe('Creating events', () => {

  it('create remote work for one day', () => {
    cy.get('.styles_cell__1hFOf.scrollbar.false.styles_cellWithBorders__2_CLV.styles_cellEvent__2UMwI.styles_cellActive__2bhFn.false')
      .each((value, index) => {
        if (index == 1) {
          console.log(value)
          cy.wrap(value).click()
        }
      })

    cy.get('.styles_eventSelectorField__30U3m').contains('Remote').click()
    cy.get('#DATE_FROM').click().clear().type(moment().format('YYYY-MM-DD') + '{enter}')
    cy.get('#DATE_TO').click().type(moment().add(1, 'days').format('YYYY-MM-DD') + '{enter}')
    cy.get('#REASON').click().type('Test')
    cy.get('[type="submit"]').click()
    .wait(5000)
      .then(() => {
        cy.get('.ant-notification-notice-description')
          .should('have.text', 'Event added successfully')
      })
  })
})

describe('Cancel created event', () => {

  it('cancel', () => {
    cy.get('.styles_sticker__1qvw1.stickerOM_sticker_R_light__19vfa')
    .click()
    if (cy.get('.styles_stickerName__1M4Ya').should('have.text', 'R')) {
      cy.get('.styles_sticker__1qvw1.stickerOM_sticker_R_light__19vfa')
        .click()
    }
    cy.get('.ant-btn.ant-btn-primary.ant-btn-dangerous').click()
    cy.get('.ant-input').click().type('Test')
    cy.get('.ant-btn.ant-btn-primary').should('have.text', 'Submit').click()
  })
})