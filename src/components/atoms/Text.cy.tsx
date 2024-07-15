import { Text } from "./Text"

describe("<Text />", () => {
  it("renders with custom text, font bold and zinc color", () => {
    cy.mount(<Text text="Custom text" bold />)
    cy.get("p")
      .should("have.text", "Custom text")
      .and("have.class", "font-bold")
      .and("have.class", "text-zinc-300")
  })

  describe("when bold property is false", () => {
    it("shows the text without bold class", () => {
      cy.mount(<Text text="Custom text" bold={false} />)
      cy.get("p").should("not.have.class", "font-bold")
    })

    describe("when variant property is footer", () => {
      it("shows the text with red color", () => {
        cy.mount(<Text text="Custom text" bold variant="footer" />)
        cy.get("p").should("have.class", "text-red-700")
      })
    })
  })
})
