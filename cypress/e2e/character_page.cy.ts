describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('div#character-list').should('exist').within(() => {
      cy.get('a').first().click()
    })
  })

  it('renders the page components', () => {
    cy.get('body > main > div > div').first().within(() => {
      cy.get('a').should('have.attr', 'href', '/').within(() => {
        cy.get('img').should('have.attr', 'alt').and('include', 'icon')
        cy.get('p').should('have.text', 'Voltar')
      })
      cy.get('p').last().should('have.text', 'Character')
    })

    cy.get('#character-details-card').within(() => {
      cy.get('div').first().find('img').should('have.attr', 'alt', 'hero image')
      cy.get('#comics-list').should('exist').within(() => {
        cy.get('img').should('be.visible').should('have.attr', 'alt', 'hero image')
      })
    })
  })

  it('redirects to home page when clicked on back arrow', () => {
    cy.get('a').first().click()
    cy.url().should('match', /\//)
  })
})
