beforeEach(() => {
  cy.visit('/');
});

it('should be able to search for a character and see name suggestions', () => {
  cy.wait(3000);
  cy.get('[data-testid=input-search]').type('spider');
  cy.wait(1000);
  cy.get('[data-testid=input-search-suggestion-box]', {
    timeout: 10000,
  });
  cy.get('[data-testid=input-search-suggestion-box]', {
    timeout: 10000,
  }).should('be.visible');
  cy.get('[data-testid=input-search-suggestion-box]', {
    timeout: 10000,
  })
    .first()
    .should('contain', 'Spider-dok');
});

it('should be able to click on a name suggestion and see the character details', () => {
  cy.wait(3000);
  cy.get('[data-testid=input-search]', {
    timeout: 10000,
  }).type('spider');
  cy.wait(1000);
  cy.get('[data-testid=input-search-suggestion-box]', {
    timeout: 10000,
  }).should('be.visible');
  cy.get('[data-testid=input-search-suggestion-box]').first().click();
  cy.get('[data-testid=input-search]', {
    timeout: 10000,
  })
    .should('have.value', 'Spider-dok')
    .clear();
  cy.get('[data-testid=input-search-suggestion-box]', {
    timeout: 10000,
  }).should('not.exist');
});
