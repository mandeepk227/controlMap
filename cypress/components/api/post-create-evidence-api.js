Cypress.Commands.add('postCreateApiEvidence', (alias = 'postCreateApiEvidence') => {
    Cypress.log({
      name: 'postCreateApiEvidence'
    })
    cy.intercept('POST', '**/v1/task/create').as(alias)
  })