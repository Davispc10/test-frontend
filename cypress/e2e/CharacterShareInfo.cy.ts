beforeEach(() => {
  cy.visit('/');
});

it('should be able to share a characater', () => {
  cy.wait(1000);
  cy.get('[data-testid=input-search]').type('spider');
  cy.wait(1000);
  cy.get('[data-testid=search-btn]')
    .should('not.to.have.class', 'opacity-40')
    .click();
  cy.wait(1000);
  cy.get('[data-testid=character-card]', {
    timeout: 10000,
  })
    .first()
    .should('contain', 'Spider-dok')
    .click();
  cy.wait(1000);
  cy.get('[data-testid=share-btn]').click();
  cy.get('[data-testid=share-modal-view]').should('be.visible');
  cy.get('[data-testid=share-copy-btn-text]').should('contain', 'Copy link');
  cy.get('[data-testid=share-copy-btn]').click();
  cy.get('[data-testid=share-copy-btn-text]').should('contain', 'Copied!');
  cy.wait(3001);
  cy.get('[data-testid=share-copy-btn-text]').should('contain', 'Copy link');
  cy.window().then((win) => {
    cy.stub(win.navigator.clipboard, 'readText').resolves('/1010727');
  });
});
