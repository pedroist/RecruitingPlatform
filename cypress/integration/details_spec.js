describe('Posting details', () => {
    it('should be possible to go back to list', () => {
        cy.visit('/')

        cy.get('[data-test="posting"]')
            .first()
            .click()

        cy.get('[data-test="posting-name"]')
        cy.get('[data-test="posting-location"]')
        cy.get('[data-test="job-description"]')
        cy.get('[data-test="job-qualifications"]')

        cy.get('[data-test="back"]')
            .click()

        cy.get('[data-test="posting"]')
    })
})
