describe("Character List", () => {
  it("should be able to filter by name", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[name=searchByName]").type("iron");
  });

  it("should be able to list all characters", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-cy="cards"]')
      .find('[data-cy="card"]')
      .should("have.length", 10);
  });

  it("should be able to navigate to differents pages", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-cy="pagination"]').find('[data-cy="pagination-2"]').click();
  });

  it("should be able to click on a visit btn card", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-cy="cards"]')
      .find('[data-cy="card"]')
      .first()
      .find('[data-cy="look-more"]')
      .click();
  });
});
