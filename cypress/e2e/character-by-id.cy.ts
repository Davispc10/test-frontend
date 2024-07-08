describe('Character By Id', () => {
  const characterID = 1010699;

  it('should be able to get character by id', () => {
    cy.visit(`http://localhost:3000/character/${characterID}`);
    cy.url().should('eq', `http://localhost:3000/character/${characterID}`);
  });
});
