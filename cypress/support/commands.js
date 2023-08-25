// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (userID, password) => {
  cy.get('.login').should('be.visible');
  cy.get('input[placeholder="UserName"]').clear().type(userID);
  cy.get('input[placeholder="Password"]').clear().type(password);
  cy.get('button[type="submit"]').should('be.enabled').click();
  cy.waitForNetworkIdle('GET', '**/v1/masterassessments', 3000)
})

Cypress.Commands.add('selectApp',(applicationName) =>{
  cy.get('#sidebar').contains(applicationName).click()
})

Cypress.Commands.add('assetFormFill', (assetDetails)=>{
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
})

Cypress.Commands.add('policyFormFill', (policyDetails)=>{
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
})

Cypress.Commands.add('riskRegisterFormFill', (riskDetails)=>{
  cy.get('app-custom-action-dropdown button.btn').click();
  cy.get('ul.anchor-list').find('li').contains('Add Risk').click({force:true});
  cy.waitApiResponseStatusCode('@getApiRiskForm', 200);
  cy.get('[formcontrolname="riskName"] input').clear().type(riskDetails.name);
  cy.get('.sidebar').contains('Owner').parent().as('ownerField');
  cy.get('@ownerField').clear().type(riskDetails.owner);
  cy.get('@ownerField').parent().find('.dropdown-list li').first().click();
  cy.get('.sidebar').contains('Department').parent().as('department')
  cy.get('@department').click();
  cy.get('@department').parent().find('.dropdown-list').contains(riskDetails.department).click();
  cy.get('.sidebar').contains('Category').parent().as('category')
  cy.get('@category').click();
  cy.get('@category').parent().find('.dropdown-list').contains(riskDetails.category).click();
  cy.get('[formcontrolname="businessImpact"] textarea').clear().type(riskDetails.description);
  cy.get('.sidebar .btn-primary').contains('Next').should('be.enabled').click({force:true});
  cy.get('.sidebar .btn-primary').contains('Next').should('be.enabled').click({force:true});
  cy.get('.sidebar .btn-primary').contains('Next').should('be.enabled').click({force:true});
  cy.get('.sidebar .btn-primary').contains('Create Risk').should('be.enabled').click({force:true});
})

Cypress.Commands.add('evidenceFormFill', (evidenceDetails)=>{
  cy.get('app-custom-action-dropdown button.btn').click();
  cy.get('ul.anchor-list').find('li').contains('Manual evidence collection').click({force:true});
  cy.get('[formcontrolname="title"] input').clear().type(evidenceDetails.name)
  cy.get('[formcontrolname="description"] textarea').clear().type(evidenceDetails.description);
  cy.get('.sidebar').contains('Primary Owner').parent().as('ownerField');
  cy.get('@ownerField').find('input').clear().type(evidenceDetails.owner);
  cy.get('@ownerField').parent().find('.dropdown-list li').first().click();
  cy.get('.sidebar').contains('Assignee').parent().as('assigneeField');
  cy.get('@assigneeField').find('input').clear().type(evidenceDetails.assignee);
  cy.get('@assigneeField').parent().find('.dropdown-list li').first().click();
  cy.get('.sidebar .btn-primary').contains('Create').should('be.enabled').click({force:true});
})