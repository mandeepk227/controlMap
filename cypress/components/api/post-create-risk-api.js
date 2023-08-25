Cypress.Commands.add('postCreateApiRisks', (alias = 'postCreateApiRisks') => {
    Cypress.log({
      name: 'postCreateApiRisks'
    })
    cy.intercept('POST', '**/v1/risk').as(alias)
  })