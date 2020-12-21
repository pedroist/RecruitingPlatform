describe('List', () => {
    it('displays postings', () => {
        cy.visit('/')

        cy.get('[data-test="posting"]').within(() => {
            cy.get('[data-test="posting-name"]')
            cy.get('[data-test="posting-location"]')
        })
    })

    it('contains links to details', () => {
        cy.visit('/')

        cy.get('[data-test="posting"]')
            .first()
            .click()

        cy.get('[data-test="posting-name"]')
        cy.get('[data-test="posting-location"]')
        cy.get('[data-test="job-description"]')
        cy.get('[data-test="job-qualifications"]')
    })
})