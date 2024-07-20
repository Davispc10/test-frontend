
describe('HomePage', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('displays the page title', () => {
      cy.get('h1').should('contain', 'Personagens da Marvel');
    });
  
    it('shows loading spinner when fetching data', () => {
      cy.intercept('GET', '**/characters*', { delay: 1000 }).as('getCharacters');
      cy.reload();
      cy.get('.animate-spin').should('be.visible');
      cy.wait('@getCharacters');
    });
  
    it('displays character list after loading', () => {
      cy.get('.animate-spin').should('not.exist');
      cy.get('[data-testid="character-card"]').should('have.length.greaterThan', 0);
    });
  
    it('performs search and updates results', () => {
      const searchTerm = 'Spider';
      cy.get('input[type="text"]').type(searchTerm);
      cy.get('button').contains('Buscar').click();
      cy.get('[data-testid="character-card"]').should('contain', searchTerm);
    });
  
    it('changes page and updates results', () => {
      cy.get('[data-testid="pagination"]').contains('2').click();
      cy.url().should('include', 'page=2');
      cy.get('[data-testid="character-card"]').should('have.length.greaterThan', 0);
    });
  
    it('saves search term and page to localStorage', () => {
      const searchTerm = 'Iron';
      cy.get('input[type="text"]').type(searchTerm);
      cy.get('button').contains('Buscar').click();
      cy.get('[data-testid="pagination"]').contains('3').click();
      cy.reload();
      cy.get('input[type="text"]').should('have.value', searchTerm);
      cy.url().should('include', 'page=3');
    });
  });