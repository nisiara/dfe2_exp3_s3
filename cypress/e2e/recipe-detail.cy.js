
describe('Navega a la página del detalle de la receta', () => {
  
  // Test 1: Detalle de receta - verifica contenido del detalle
  it('Detalle Receta', () => {
    cy.intercept('GET', 'http://localhost:5173/recipes').as('obtenerRecetas');
    cy.visit('http://localhost:5173/recipes');
    cy.wait('@obtenerRecetas');
    cy.contains('Ver Receta').click();
   
    cy.get('h1').should('exist');
    cy.get('ul')
      .children('li').should('exist')
    cy.get('img[alt*="Portada "]').should('be.visible')
    
    
    cy.get('aside')
      .children('div').eq(0).children('span')
      .should('be.visible')
      .and('contain.text', 'tiempo de preparación');
    
    cy.get('aside')
      .children('div').eq(1).children('span')
      .should('be.visible')
      .and('contain.text', 'tiempo de cocción');
    
    cy.get('aside')
      .children('div').eq(2).children('span')
      .should('be.visible')
      .and('contain.text', 'porciones');
      
    cy.get('section')
      .children('aside').eq(0).children('h5')
      .should('be.visible')
      .and('contain.text', 'ingredientes')
    
    cy.get('section')
      .children('aside').eq(1).children('h5')
      .should('be.visible')
      .and('contain.text', 'preparación')
    
  })

  // Test 2: Acceso directo a /recipes/1 por la URL
  it('Acceso directo a /recipes/1 muestra el detalle', () => {
    cy.intercept('GET', '**/recipes/**').as('obtenerReceta');

    cy.visit('http://localhost:5173/recipes/1');
    cy.wait('@obtenerReceta');

    cy.get('h1').should('be.visible');
    cy.get('img[alt*="Portada "]')
      .should('be.visible')
      .and('have.attr', 'src');

    cy.get('aside').children('div').eq(0).children('span')
      .should('be.visible')
      .and('contain.text', 'tiempo de preparación');

    cy.get('section').children('aside').eq(0).children('h5')
      .should('be.visible')
      .and('contain.text', 'ingredientes');

    cy.get('section').children('aside').eq(1).children('h5')
      .should('be.visible')
      .and('contain.text', 'preparación');
  });
})