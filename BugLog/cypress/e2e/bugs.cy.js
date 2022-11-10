// @ts-nocheck
describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080')
    cy.contains('Login').click()
    cy.contains('Email').type("trashpanda9000@trashpanda.com")
    cy.contains('password').type("trashpanda!2021!")
    cy.contains('continue').click()
    cy.contains('BugsPage').click()
  })
})