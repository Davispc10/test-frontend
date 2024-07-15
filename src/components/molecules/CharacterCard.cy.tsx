import { CharacterCard } from "./CharacterCard"

describe("<CharacterCard />", () => {
  it("renders", () => {
    cy.fixture("charactersApiResponse").then((response) => {
      cy.mount(<CharacterCard character={response.data.results[0]} />)
      cy.get("a").should(
        "have.attr",
        "href",
        `/character/${response.data.results[0].id}`,
      )
      cy.get("img").should("have.attr", "alt", `hero image`)
      cy.get("p").should("have.class", "peer")
    })
  })
})
