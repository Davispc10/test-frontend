describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders the page components', () => {
    cy.get('input').should('exist').and('have.class', 'shadow-lg')

    cy.get('div#pagination-bar').should('exist').first().within(() => {
      cy.get('img').should('have.attr', 'alt').and('include', 'icon')
    })
    cy.get('div#pagination-bar').should('exist').last().within(() => {
      cy.get('img').should('have.attr', 'alt').and('include', 'icon')
    })

    cy.get('div#character-list').should('exist').within(() => {
      cy.get('a').first().within(() => {
        cy.get('p').should('have.class', 'peer')
        cy.get('img').should('have.attr', 'alt', 'hero image')
      })
    })

    cy.get('div#page-footer').within(() => {
      cy.get('p').should('have.text', '2024 © Carlos Edilson Junior')
    })
  })

  it('shows red border on input on focus', () => {
    cy.get('input').focus().should('have.class', 'focus:ring-red-600')
  })

  it('redirects to next page when clicked on character card', () => {
    cy.get('div#character-list').should('exist').within(() => {
      cy.get('a').first().click()
      cy.url().should('match', /character\/.*/)
    })
  })
})
