import { should } from "chai"
import { CharactersList } from "./CharactersList"

describe("<CharacterCard />", () => {
  describe("when characters are empty", () => {})
  describe("when characters are filled", () => {
    it("renders", () => {
      cy.fixture("charactersApiResponse").then((response) => {
        cy.mount(<CharactersList characters={response.data.results} />)
        cy.get("a").should(
          "have.attr",
          "href",
          `/character/${response.data.results[0].id}`,
        )
        cy.get("a").should(
          "have.attr",
          "href",
          `/character/${response.data.results[1].id}`,
        )
        cy.get("p").first().should("have.text", response.data.results[0].name)
        cy.get("p").last().should("have.text", response.data.results[1].name)
      })
    })
  })
})
