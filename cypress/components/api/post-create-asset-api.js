Cypress.Commands.add('postApiCreateAssets', (alias = 'postApiCreateAssets') => {
  Cypress.log({
    name: 'postApiCreateAssets'
  })

  cy.intercept('POST', '**/v1/asset').as(alias)
})


// Cypress.Commands.add('waitCreateAssets', () => {
//   Cypress.log({
//     name: 'waitCreateAssets'
//   })

//   cy.wait('@postApiCreateAssets', {responseTimeout: 30000}).then(($assert) => {
//     // const assetID = $assert.response.id
//     cy.wrap($assert.response.id).as('assetID')
//   })
// })