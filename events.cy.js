
before('open page', function () {
    cy.visit("http://localhost:5000")
    localStorage.setItem("token", '');
    cy.wait(5000)
})

describe('display elements', () => {

    it('Headers', () => {
        cy.get('.mb-4.text-2xl.font-bold')
            .should('have.text', 'Out of office')
        cy.get('.vacations-title')
            .should('have.text', 'Vacations')
        cy.get('.calendar-title')
            .should('have.text', 'Calendar')
    })

     it ('question icon', () => {
         cy.get('.question-icon', { timeout: 20000 })
         .should('be.visible')
     })



    it('Past year', () => {
        cy.get('.chevron-icon').each((value, index) => {
            if (index == 0) {
                console.log(value)
                cy.wrap(value).click()
            }
         cy.get('.styles_year__kSbSo')
                .should('have.text', '2021')
        })
    })

    it('This year', () => {
        cy.get('.chevron-icon').each((value, index) => {
            if (index == 1) {
                console.log(value)
                cy.wrap(value).click()
            }
        })
        .then(()=>{
            cy.get('.styles_year__kSbSo')
          .should('have.text', '2022')
        })
    })

    it('Future year', () => {
        cy.get('.chevron-icon').each((value, index) => {
            if (index == 1) {
                console.log(value)
                cy.wrap(value).click()
            }
        })
        .then(()=>{
            cy.get('.styles_year__kSbSo')
                .should('have.text', '2023')
        })

})
        it('event filters', () => {
            cy.get('.text-gray-500.pl-2')
                .should('have.text', 'Holiday')
            .should('be.checked')

        })


})

