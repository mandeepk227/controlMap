Cypress.Commands.add('getApiEvidence', (alias = 'getApiEvidence') => {
    Cypress.log({
      name: 'getApiEvidence'
    })
    cy.intercept('GET', '**/v1/notifications').as(alias)
})