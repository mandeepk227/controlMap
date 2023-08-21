describe('policies form fill', () => {
  const userData = Cypress.env('data')
  const userName = userData.userID
  const password = userData.password
  const policyDetails = {
    name : `testPolicy${Math.round(Math.random()*1000)}`,
    how : 'Manage in ControlMap',
    select : 'Antivirus policy'
  }
  let policyID = null;

  before(() => {
    cy.postApiPolicies()
    cy.postApiCreatePolicy()
    cy.visit('/')
    cy.waitForNetworkIdle('GET', '**', 2000)
    cy.login(userName, password)
    
  });

  it('test', () => {
    cy.get('#sidebar').contains('Policies').click();
    cy.waitApiResponseStatusCode('@postApiPolicies', 200);
    cy.get('app-custom-action-dropdown button.btn').click();
    cy.get('ul.anchor-list').find('li').contains('Add Policy').click({force:true});
    cy.get('[formcontrolname="policyName"] input').clear().type(policyDetails.name);
    cy.get('.sidebar .dropdown-div').eq(0).as('firstDropdown');
    cy.get('@firstDropdown').click();
    cy.get('@firstDropdown').parent().find('ul li').contains(policyDetails.how).click();
    cy.get('.sidebar .dropdown-div').eq(1).as('secondDropdown');
    cy.get('@secondDropdown').click();
    cy.get('@secondDropdown').parent().find('ul li').contains(policyDetails.select).click();
    cy.get('button.btn-primary').contains('Save').click();
    cy.wait('@postApiCreatePolicy').then(($asset)=> {
      expect($asset.response.statusCode).to.equal(200)
      assetID = $asset.response.body.id
    })
  });

  after(() => {
    let assetURL = `https://salea.app.ctrlmap.com/s/policies/list/single?id=${policyID}`
    cy.visit(assetURL,{
      headers: {
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "axios/0.18.0"
        },
        failOnStatusCode: false
    })
    cy.waitForNetworkIdle('GET', '**', 2000)
    cy.get('h5 .truncateat').should('have.text', policyDetails.name)
  });

});