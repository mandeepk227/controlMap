Cypress.Commands.add('postApiPolicies', (alias = 'postApiPolicies') => {
  Cypress.log({
    name: 'postApiPolicies'
  })

  cy.intercept('POST', '**/v1/policies').as(alias)
})