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
    .should('contain', 'Spider-dok')
    .click();
  cy.get('[data-testid=confirm-search-btn]')
    .should('not.to.have.class', 'opacity-40')
    .click();
  cy.get('[data-testid=character-card]', {
    timeout: 10000,
  })
    .first()
    .should('contain', 'Spider-dok')
    .click();
  cy.wait(4000);
  cy.url().should('include', '/1010727');
});
