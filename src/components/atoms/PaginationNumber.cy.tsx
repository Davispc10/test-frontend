import { PaginationNumber } from "./PaginationNumber"

describe("<PaginationNumber />", () => {
  it("renders", () => {
    cy.mount(<PaginationNumber />)
  })

  describe("when PaginationNumber receives a number", () => {
    it("shows the number", () => {
      cy.mount(<PaginationNumber number={1} />)
      cy.get("span").should("have.text", 1).and("not.have.class", "bg-red-600")
    })

    describe("when is passed the active property", () => {
      it("shows the number with red background", () => {
        cy.mount(<PaginationNumber number={1} active />)
        cy.get("span").should("have.text", 1).and("have.class", "bg-red-600")
      })
    })
  })

  describe("when PaginationNumber does not receive a number", () => {
    it("shows three dots with gray color", () => {
      cy.mount(<PaginationNumber />)
      cy.get("span")
        .should("have.text", "...")
        .and("have.class", "text-zinc-500")
    })
  })
})
