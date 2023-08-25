Cypress.Commands.add('getApiRiskForm', (alias = 'getApiRiskForm') => {
    Cypress.log({
      name: 'getApiRiskForm'
    })
    cy.intercept('GET', '**/v1/risk/department').as(alias)
  })