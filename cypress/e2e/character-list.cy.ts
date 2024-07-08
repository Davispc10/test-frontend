describe('Character List', () => {
  it('should be able to filter by name', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[name=input-name]').type('spider');
  });

  it('should be able to list all characters', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy="cards"]').find('[data-cy="card"]').should('have.length', 10);
  });

  it('should be able to navigate to next page', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy="next-page"]').click();
  });

  it('should be able to click on a card', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy="cards"]').find('[data-cy="card"]').first().click();
  });
});
