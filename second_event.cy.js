import moment from 'moment';

before('login', function () {
    cy.visit("http://localhost:5000")
    localStorage.setItem("token", '');
    cy.wait(30000).get('.ant-input').click().type('kor{enter}')
        .wait(10000)
})

afterAll('cancel created event', function () {
  if (cy.get('.styles_stickerName__1M4Ya')[1].should('have.text', 'TTt')) {
    cy.get('.styles_sticker__1qvw1.stickerOM_sticker_R_light__19vfa')
      .click()
  }
  cy.get('.ant-btn.ant-btn-primary.ant-btn-dangerous').click()
  cy.get('.ant-input').click().type('Test')
  cy.get('.ant-btn.ant-btn-primary').should('have.text', 'Submit').click()
})

describe('Creating event', () => {

    it('Creating event to a weekend', () => {
        cy.get('.styles_cell__1hFOf.scrollbar.false.styles_cellWithBorders__2_CLV.styles_cellEvent__2UMwI.styles_cellActive__2bhFn.false')
            .each((value, index) => {
                if (index == 1) {
                    console.log(value)
                    cy.wrap(value).click()
                }
            })
        cy.get('.styles_eventSelectorField__30U3m').contains('Sick leave').click()
        cy.get('#DATE_FROM_TRANSFER').click().clear().type(moment().format('YYYY-MM-DD') + '{enter}')
        cy.get('#DATE_TO_TRANSFER').click().clear().type(moment().format('YYYY-MM-DD') + '{enter}')
        cy.get('#REASON').click().type('Test')
            cy.get('#PROJECT_NAME').click()
            cy.get('[type="submit"]').click()
            .wait(5000)
            .then(() => {
                cy.get('.ant-notification-notice-description')
                    .should('have.text', 'Event added successfully')
            })
    })

     it('Creating event to a working day', () => {
             cy.get('.styles_cell__1hFOf.scrollbar.false.styles_cellWithBorders__2_CLV.styles_cellEvent__2UMwI.styles_cellActive__2bhFn.false')
            .each((value, index) => {
                if (index == 1) {
                    console.log(value)
                    cy.wrap(value).click()
                }
            })
        cy.get('.styles_eventSelectorField__30U3m').contains('Sick leave').click()
        cy.get('#DATE_FROM_TRANSFER').click().clear().type(moment().format('YYYY-MM-DD') + '{enter}')
        cy.get('#DATE_TO_TRANSFER').click().clear().type(moment().format('YYYY-MM-DD') + '{enter}')
        cy.get('#REASON').click().type('Test')
            // выбрать проект из dopdown
            // cy.get('#PROJECT_NAME').click()
            //cy.get('[type="submit"]').click()
            .wait(5000)
            .then(() => {
                cy.get('.ant-notification-notice-description')
                    .should('have.text', 'From the backend was got status of code: 500')
            })
     })
})

