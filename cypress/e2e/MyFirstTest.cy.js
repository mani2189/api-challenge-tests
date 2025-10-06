describe('Zooplus Cookie Test', () => {

  it('Accepts the cookie popup', () => {
    cy.visit("https://www.zooplus.de/")

    // Wait for popup and click the green button
    cy.get('button#onetrust-accept-btn-handler', { timeout: 10000 })
      .should('be.visible')
      .click()

    // Now continue with your test
    cy.title().should('contain', 'zooplus')
  })

})

it('Verify title - negative test', () => {
  cy.visit("https://www.zooplus.de/")
  cy.title().should('eq', 'Good') // will fail intentionally
})
