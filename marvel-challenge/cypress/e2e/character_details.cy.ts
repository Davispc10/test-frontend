
describe('CharacterDetails', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/characters/*', { fixture: 'character.json' }).as('getCharacter');
      cy.intercept('GET', '**/characters/*/comics', { fixture: 'comics.json' }).as('getComics');
      cy.visit('/character/1234'); // Replace with a valid character ID
    });
  
    it('displays the character name and description', () => {
      cy.wait('@getCharacter');
      cy.get('h1').should('contain', 'Spider-Man');
      cy.get('p').should('contain', 'Bitten by a radioactive spider');
    });
  
    it('shows the character image', () => {
      cy.get('img[alt="Spider-Man"]').should('be.visible');
    });
  
    it('displays a list of comics', () => {
      cy.wait('@getComics');
      cy.get('h2').should('contain', 'Quadrinhos que o Spider-Man participa');
      cy.get('[data-testid="comic-card"]').should('have.length.greaterThan', 0);
    });
  
    it('navigates back to home page when clicking the back button', () => {
      cy.get('button').contains('Voltar para página inicial').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  
    it('shows loading spinner when fetching data', () => {
      cy.intercept('GET', '**/characters/*', { delay: 1000 }).as('getCharacterDelayed');
      cy.intercept('GET', '**/characters/*/comics', { delay: 1000 }).as('getComicsDelayed');
      cy.visit('/character/1234');
      cy.get('.animate-spin').should('be.visible');
      cy.wait(['@getCharacterDelayed', '@getComicsDelayed']);
      cy.get('.animate-spin').should('not.exist');
    });
  
    it('displays error message when API calls fail', () => {
      cy.intercept('GET', '**/characters/*', { statusCode: 500 }).as('getCharacterError');
      cy.intercept('GET', '**/characters/*/comics', { statusCode: 500 }).as('getComicsError');
      cy.visit('/character/1234');
      cy.get('.text-red-600').should('contain', 'Erro ao carregar dados');
    });
  });