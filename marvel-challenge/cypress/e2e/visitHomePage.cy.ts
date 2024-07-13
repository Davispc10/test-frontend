describe('Home Page', () => {
    it('Visitar Home Page', () => {
      cy.visit('http://localhost:3000/');
      cy.contains('Personagens da Marvel')
    })
  
    it('Verificar se tem um botão ', () => {
      cy.visit('http://localhost:3000/');
      cy.contains('Buscar').should('be.visible');

    })
  })