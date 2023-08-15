Cypress.Commands.add('waitApiResponseStatusCode', (alias, statusCode, options = {}) => {
  /**
     * @waitApiResponseStatusCode
     * You inputAPI intercept alias name and expected
     * status code parameters
     *
     * @param {String} alias using the api intercept alias name
     * @param {Integer} statusCode 200
     * @param {Object} options pass in options to change default behavior of wait
     *
     * @example
     *  before(() => {
     *      cy.getRegistrationLogin();
     *  });
     *
     *  it('test scenario', () => {
     *      ...
     *      cy.get(navigation.logoutUserMenu).click();
     *      cy.waitApiResponseStatusCode('@getRegistrationLogin', 200);
     *  });
     *
     */

  cy.wait(alias, options).then(() => {
    cy.get(alias).its('response.statusCode').should('eq', statusCode)
  })

  Cypress.log({
    name: 'waitApiResponseStatusCode'
  })
})
