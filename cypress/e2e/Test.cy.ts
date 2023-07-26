beforeEach(() => {
  cy.visit('/');
});

it('should be able to run an initial test', () => {
  expect(true).to.equal(true);
});
