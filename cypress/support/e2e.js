// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import '../components/api/wait-api-response-status-code'
import 'cypress-network-idle'
import '../components/api/post-asset-api'
import '../components/api/post-create-asset-api'
import '../components/api/post-create-policy-api'
import '../components/api/post-policies-api'
import '../components/api/get-risk-form-api'
import '../components/api/post-risk-api'
import '../components/api/post-create-risk-api'
import '../components/api/get-evidences-api'
import '../components/api/post-create-evidence-api'

// Alternatively you can use CommonJS syntax:
// require('./commands')
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})