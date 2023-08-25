describe('risk form fill', () => {
    const userData = Cypress.env('data')
    const userName = userData.userID
    const password = userData.password
    const riskDetails = {
      name : `testRisk${Math.round(Math.random()*1000)}`,
      owner : 'Dan Fox',
      department : 'Sales',
      category : 'Asset Management',
      description: 'Test description'
    }
    let riskID = null;
    before(() => {
      cy.postApiRisks()
      cy.getApiRiskForm()
      cy.postCreateApiRisks()
      cy.visit('/')
      cy.waitForNetworkIdle('GET', '**', 2000)
      cy.login(userName, password)
    });
    it('risk form fill', () => {
      cy.selectApp('Risk Register');
      cy.waitApiResponseStatusCode('@postApiRisks', 200);
      cy.riskRegisterFormFill(riskDetails);
      cy.wait('@postCreateApiRisks').then(($risk)=> {
        expect($risk.response.statusCode).to.equal(200)
        riskID = $risk.response.body.id
      })
    });
    after(() => {
      let assetURL = `https://salea.app.ctrlmap.com/s/risk/view?risk=${riskID}`
      cy.visit(assetURL,{
        headers: {
          "Accept": "application/json, text/plain, */*",
          "User-Agent": "axios/0.18.0"
          },
          failOnStatusCode: false
      })
      cy.waitForNetworkIdle('GET', '**', 2000)
      cy.get('h4 .mr-3').should('contain', riskDetails.name)
    });
  });