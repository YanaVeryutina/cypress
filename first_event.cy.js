import moment from 'moment';

before('login', function () {
  cy.visit("http://localhost:5000")
  localStorage.setItem("token", '');
  cy.wait(30000).get('.ant-input').click().type('kor{enter}')
    .wait(10000)
})

afterEach('clear search by users', () => {
  cy.get('.ant-input-suffix').click()
  .wait(5000)
  })

 describe('Creating event', () => {

  it('create event on working day', () => {
    cy.get('.styles_cell__1hFOf.scrollbar.fal se.styles_cellWithBorders__2_CLV.styles_cellEvent__2UMwI.styles_cellActive__2bhFn.false')
      .each((value, index) => {
        if (index == 1) {
          console.log(value)
          cy.wrap(value).click()
        }
      })

    cy.get('.styles_eventSelectorField__30U3m').contains('Transfer time').click()
    cy.get('#DATE_FROM_TRANSFER').click().clear().type(moment().format('YYYY-MM-DD') + '{enter}')
    cy.get('#TIME_START_DATE_FROM').click().clear().type('08:00')
    cy.get('#DATE_TO_TRANSFER').click().type(moment().add(1, 'days').format('YYYY-MM-DD') + '{enter}')
    cy.get('#TIME_START_DATE_TO').click().clear().type('10:00')
    cy.get('#TOTAL_HOURS').click().type('2')
    cy.get('#REASON').click().type('Test')
    cy.get('#PROJECT_NAME').click()
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

    cy.get('.styles_stickerName__1M4Ya')
      .each((value, index) => {
        if (index == 1) {
          console.log(value)
          cy.wrap(value).should('have.text', 'TTt')
            .click()
        }
      })
    cy.get('.styles_eventContainer__PfZcD')
      .each((value) => {
        cy.wrap(value).find('.styles_row__3HJnk.styles_item__2pk1d')
          .should('have.text', 'Approved')
      })

    cy.get('textarea.ant-input').click().type('Test')
    cy.get('.ant-modal-footer > button.ant-btn.ant-btn-primary').should('have.text', 'Submit').click()
  })
})