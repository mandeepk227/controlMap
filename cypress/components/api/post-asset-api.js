Cypress.Commands.add('postApiAssets', (alias = 'postApiAssets') => {
  Cypress.log({
    name: 'postApiAssets'
  })

  cy.intercept('POST', '**/v1/assets').as(alias)
})