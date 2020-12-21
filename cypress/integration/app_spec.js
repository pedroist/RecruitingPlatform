describe('App', () => {
    it('can be opened', () => {
        cy.visit('/')
        cy.get('[data-test="app"]')
    })
})
