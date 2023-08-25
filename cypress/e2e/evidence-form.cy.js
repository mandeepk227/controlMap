describe('evidence form fill', () => {
    const userData = Cypress.env('data')
    const userName = userData.userID
    const password = userData.password
    const evidenceDetails = {
      name : `testEvidence${Math.round(Math.random()*1000)}`,
      owner : 'Dan Fox',
      assignee : 'Dan Fox',
      description: 'Test description'
    }
    let evidenceID = null;
    before(() => {
      cy.getApiEvidence()
      cy.postCreateApiEvidence()
      cy.visit('/');
      cy.waitForNetworkIdle('GET', '**', 2000);
      cy.login(userName, password);
    });
    it('evidence form fill', () => {
      cy.selectApp('Evidence');
      cy.waitApiResponseStatusCode('@getApiEvidence', 200);
      cy.evidenceFormFill(evidenceDetails);
      cy.wait('@postCreateApiEvidence').then(($evidence)=> {
        expect($evidence.response.statusCode).to.equal(200);
        evidenceID = $evidence.response.body.additionalData.code;
      })
    })
    after(() => {
      cy.get('app-search-box').click();
      cy.get('input[placeholder="Search evidence"]').clear().type(`${evidenceID}{enter}`);
      cy.waitForNetworkIdle('POST', '**', 2000);
      cy.get('.ui-table-scrollable-body-table .ui-table-tbody tr td').contains(evidenceID).should('be.visible');
    });
  })