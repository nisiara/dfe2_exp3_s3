function obetenerTextoLink(texto){
  cy.get('.menu > ul')
    .children('li')
    .contains(texto)
    .click()
    .wait(300) // breve espera para transición de ruta
}

describe('Navegación menú header', () => {
  beforeEach( () => {
    cy.visit('http://localhost:5173')
  })

  // Test 1: Navega a Inicio - valida portada y src
  it('Navega la página "Inicio"', () => {
     obetenerTextoLink('Inicio')
     cy.get('img[alt="Portada Milk & Crumbs"]').should('have.attr', 'src').and('include', 'https://carorocco.com/wp-content/uploads/2021/06/Galletas-Crinkle-Pink-Lemonade-IMAGEN-DESTACADA.jpg');
  })

  // Test 2: Navega a Todas las Recetas - valida cantidad de artículos
  it('Navega a la página "Todas las Recetas"', () => {
    // Navega a la ruta de recetas desde el menú
    obetenerTextoLink('Ver todas las recetas')

    // Espera a que el listado esté presente en el DOM
    cy.get('section', { timeout: 10000 }).should('exist')

    // Busca los artículos dentro de la sección una vez renderizados
    cy.get('section').find('article', { timeout: 10000 }).should('have.length', 15)
  })

  // Test 3: Navega a Nosotros - valida encabezado y párrafos
  it('Navega a la pagina "Nosotros"', () => {
    obetenerTextoLink('Nosotros')
    cy.get('section').children('h4').should('be.visible')
    cy.get('section').children('p').should('have.length', 2)
  })
})