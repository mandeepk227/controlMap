describe('assets form fill', () => {
  const userData = Cypress.env('data')
  const userName = userData.userID
  const password = userData.password
  const assetDetails = {
    name : `test${Math.round(Math.random()*1000)}`,
    desciption : 'Test description',
    status : 'Active',
    owner : 'Aman Bansal',
    type : 'AWS Redshift'
  }
  let assetID = null;

  before(() => {
    cy.postApiAssets()
    cy.postApiCreateAssets()
    cy.visit('/')
    cy.waitForNetworkIdle('GET', '**', 2000)
    cy.login(userName, password)
    
  });

  it('test', () => {
    cy.selectApp('Assets')
    cy.waitApiResponseStatusCode('@postApiAssets', 200);
    cy.assetFormFill(assetDetails)
    cy.wait('@postApiCreateAssets').then(($asset)=> {
      expect($asset.response.statusCode).to.equal(200)
      assetID = $asset.response.body.id
    })
  });

  after(() => {
    let assetURL = `https://salea.app.ctrlmap.com/s/assets/list/single?id=${assetID}`
    cy.visit(assetURL,{
      headers: {
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "axios/0.18.0"
        },
        failOnStatusCode: false
    })
    cy.waitForNetworkIdle('GET', '**', 2000)
    cy.get('h5 .truncateat').should('have.text', assetDetails.name)
  });

});