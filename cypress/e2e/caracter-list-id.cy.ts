describe("Character By Id", () => {
  const characterID = 1009718;

  it("should be able to get character by id", () => {
    cy.visit(`http://localhost:3000/character/${characterID}`);
    cy.url().should("eq", `http://localhost:3000/character/${characterID}`);
  });

  it("should display character details", () => {
    cy.visit(`http://localhost:3000/character/${characterID}`);

    cy.get("h2").should("contain", "Wolverine");
    cy.get("p").should(
      "contain",
      "Born with super-human senses and the power to heal from almost any wound, Wolverine was captured by a secret Canadian organization and given an unbreakable skeleton and claws. Treated like an animal, it took years for him to control himself. Now, he's a premiere member of both the X-Men and the Avengers."
    );
  });

  it("should go back to last page accessed", () => {
    cy.visit("http://localhost:3000/");
    cy.visit(`http://localhost:3000/character/${characterID}`);

    cy.get("button").contains("Voltar").click();
    cy.url().should("not.include", `/character/${characterID}`);
    cy.url().should("eq", "http://localhost:3000/");
  });
});
