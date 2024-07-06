describe('Character Detail Page', () => {
  const characterId = '1010354';
  const characterUrl = `http://localhost:3000/character/${characterId}`;

  it('should navigate to character detail page', () => {
    cy.visit(characterUrl)
    cy.url().should('include', characterUrl);
  })

  it('should display character details', () => {
    cy.visit(characterUrl);

    cy.get('h1').should('contain', 'Adam Warlock')
    cy.get('p').should('contain', 'Adam Warlock is an artificially created human who was born in a cocoon at a scientific complex called The Beehive.');
  });

  it('should go back to previous page when "Voltar" button is clicked', () => {
    cy.visit(characterUrl);
    
    cy.get('button').contains('Voltar').click();
    cy.url().should('not.include', `/character/${characterId}`);
  });

  it('should display comics', () => {
    cy.visit(characterUrl);

    cy.get('ul').children().should('have.length', 20);
  });
});