describe('Character List Page', () => {
  const baseUrl = 'http://localhost:3000';

  it('should display character list', () => {
    cy.visit(`${baseUrl}`);
    cy.get('input[placeholder="Procurar pelo nome"]').should('exist');
    cy.get('button').contains('Anterior').should('exist');
    cy.get('button').contains('Próxima').should('exist');
    cy.get('div.grid').children().should('have.length', 20);
  });

  it('should search characters by name', () => {
    const searchName = 'Spider';

    cy.visit(`${baseUrl}?page=2`);
    cy.get('input[placeholder="Procurar pelo nome"]').type(searchName);
    cy.get('div.grid').children().should('have.length', 1);
  });

  it('should navigate through pages', () => {
    cy.visit(`${baseUrl}`);
    cy.get('button').contains('Próxima').click();
    cy.url().should('include', 'page=2');
    cy.get('div.grid').children().should('have.length', 20);
  });
});
