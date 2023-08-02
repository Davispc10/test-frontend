beforeEach(() => {
  cy.visit('/');
});

it('should be able to toggle between dark and light mode', () => {
  cy.get('[data-testid=app-container]', {
    timeout: 10000,
  }).should('have.class', 'bg-light-comics', 'animate-moveEffect');
  cy.get('[data-testid=dark-mode-switcher]').should('exist').click();
  cy.get('[data-testid=app-container]', {
    timeout: 10000,
  }).should('have.class', 'bg-dark-comics');
  cy.get('[data-testid=light-mode-icon]').should('exist').click();
  cy.get('[data-testid=dark-mode-icon]').should('exist');
});
