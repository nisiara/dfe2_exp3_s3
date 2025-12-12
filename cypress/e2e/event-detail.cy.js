
describe('Navega a la página Detalle de Evento', () => {
  
  it('Detalle Evento', () => {
    cy.intercept('GET', 'http://localhost:5173/events').as('obtenerEventos');
    cy.visit('http://localhost:5173/events');
    cy.wait('@obtenerEventos');
    cy.contains('Ver Evento').click();
    cy.get('h6').should('exist');
    cy.get('h1').should('exist');
    cy.get('h4').should('exist');
    
    cy.get('aside')
      .children('div').eq(0).children('span')
      .should('be.visible')
      .and('contain.text', 'locacion');
    
    cy.get('aside')
      .children('div').eq(1).children('span')
      .should('be.visible')
      .and('contain.text', 'ciudad');
    
    cy.get('aside')
      .children('div').eq(2).children('span')
      .should('be.visible')
      .and('contain.text', 'fecha');
      
    cy.get('aside')
      .children('div').eq(3).children('span')
      .should('be.visible')
      .and('contain.text', 'hora');

    cy.get('aside')
      .children('div').eq(4).children('span')
      .should('be.visible')
      .and('contain.text', 'precios');
      
     
  })
})