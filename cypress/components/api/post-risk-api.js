Cypress.Commands.add('postApiRisks', (alias = 'postApiRisks') => {
    Cypress.log({
      name: 'postApiRisks'
    })
    cy.intercept('POST', '**/v1/risks').as(alias)
  })