beforeEach(() => {
  cy.visit('/');
});

it('should be able to click on next and previous pages', () => {
  cy.get('[data-testid=character-card]', {
    timeout: 10000,
  })
    .first()
    .should('contain', '3-D Man');
  cy.get('[data-testid=next-btn]').click();
  cy.get('[data-testid=character-card]', {
    timeout: 10000,
  })
    .first()
    .should('contain', 'Ajak');
  cy.get('[data-testid=next-btn]').click();
  cy.get('[data-testid=character-card]', {
    timeout: 10000,
  })
    .first()
    .should('contain', 'Amora');
  cy.get('[data-testid=previous-btn]').click();
  cy.get('[data-testid=character-card]', {
    timeout: 10000,
  })
    .first()
    .should('contain', 'Ajak');
  cy.get('[data-testid=previous-btn]').click();
  cy.get('[data-testid=character-card]', {
    timeout: 10000,
  })
    .first()
    .should('contain', '3-D Man');
});

it('should have previous button disabled on first page', () => {
  cy.get('[data-testid=previous-btn]').should(
    'have.class',
    'pointer-events-none',
    'opacity-40'
  );
});
