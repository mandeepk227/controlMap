Cypress.Commands.add('postApiCreatePolicy', (alias = 'postApiCreatePolicy') => {
  Cypress.log({
    name: 'postApiCreatePolicy'
  })

  cy.intercept('POST', '**/v1/policy').as(alias)
})