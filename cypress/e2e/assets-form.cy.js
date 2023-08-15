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
    cy.get('#sidebar').contains('Assets').click();
    cy.waitApiResponseStatusCode('@postApiAssets', 200);
    cy.get('app-custom-action-dropdown button.btn').click();
    cy.get('ul.anchor-list').find('li').contains('Asset').click({force:true});
    cy.get('[formcontrolname="assetName"] input').clear().type(assetDetails.name);
    cy.get('[formcontrolname="description"] textarea').clear().type(assetDetails.desciption);
    cy.get('app-cm-dropdown').first().as('assetStatus');
    cy.get('app-cm-dropdown').eq(1).as('assetType');
    cy.get('@assetStatus').click()
    cy.get('@assetStatus').find('.dropdown-list').contains(assetDetails.status).click();
    cy.get('@assetType').click();
    cy.get('@assetType').find('.dropdown-list').contains(assetDetails.type).click();
    cy.get('button.btn-primary').contains('Save').click();
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