import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router'
import RecipesPage from './pages/RecipesPage'

const mockRecetas = [
  {
    id: 1,
    nombre: "Ricotta Batida",
    descripcion: "Una receta de picoteo distinta, rica y muy fácil, que está lista en sólo 20 minutos o menos. Perfecta para tablas de picoteo.",
    ingredientes: [
      "Ricotta",
      "Aceite de oliva",
      "Hierbas frescas",
      "Sal y pimienta",
      "Miel (opcional)",
      "Tomates cherry (para acompañar)",
      "Tostadas o grisines"
    ],
    tiempoPreparacion: "20 min",
    tiempoCoccion: "0 min",
    cantidadPorciones: 4,
    imagen: "https://carorocco.com/wp-content/uploads/2022/02/Ricotta-batida-IMAGEN-DESTACADA.jpg",
    categorias: [
      "Salado",
      "Picoteo",
      "Vegetariano"
    ],
    procedimiento: [
      "Batir la ricotta en un procesador o con batidora hasta que esté muy cremosa y aireada.",
      "Extender en un plato o bowl bajo.",
      "Rociar con aceite de oliva, hierbas frescas picadas, sal y pimienta.",
      "Servir acompañada de tostadas o galletas."
    ],
    observaciones: "Puedes agregar un toque de miel para un contraste agridulce."
  },
  {
    id: 2,
    nombre: "Queque de Limón, Almendra y Cereza",
    descripcion: "Un queque cítrico, fresco y veraniego. El bizcocho es de limón y almendra, con un glaseado de limón y cereza.",
    ingredientes: [
      "125 g Mantequilla sin sal",
      "170 g Azúcar",
      "Ralladura de 2 Limones",
      "3 Huevos",
      "140 g Harina sin polvos",
      "40 g Harina de Almendras",
      "20 ml Jugo de limón",
      "150 g Azúcar flor (glaseado)",
      "2 Cdas Pulpa de Cereza (glaseado)"
    ],
    tiempoPreparacion: "40 min",
    tiempoCoccion: "50 min",
    cantidadPorciones: 8,
    imagen: "https://carorocco.com/wp-content/uploads/2022/02/Queque-de-Limon-Almendra-y-Cereza-IMAGEN-DESTACADA.jpg",
    categorias: [
      "Dulce",
      "Queques",
      "Hora del té"
    ],
    procedimiento: [
      "Batir mantequilla con azúcar y ralladura hasta cremar.",
      "Agregar huevos uno a uno.",
      "Incorporar harinas y polvos intercalando con los líquidos (limón/leche).",
      "Hornear a 170ºC por 50 minutos.",
      "Para el glaseado: mezclar azúcar flor con pulpa de cereza y limón."
    ],
    observaciones: "Para el glaseado se pueden usar cerezas en almíbar trituradas."
  }
]


const renderRecipePage = (props = {}) => {
  const defaultProps = {
    listaRecetas: mockRecetas,
    loading: false,
    error: null,
    ...props
  }
  
  return render(
    <MemoryRouter>
      <RecipesPage {...defaultProps} />
    </MemoryRouter>
  )
}


describe('Conjunto de tests para el componente App', () => {
  
  it('Pasar las recetas como como props', () => {
    renderRecipePage()
    expect(screen.getByText('Ricotta Batida')).toBeInTheDocument()
    expect(screen.getByText('Queque de Limón, Almendra y Cereza')).toBeInTheDocument()
  })

  it('Mostrar las imágenes de las recetas', () => {
    renderRecipePage()
    
    const imagenes = screen.getAllByRole('img')
    const imagenSoda = imagenes.find(img => img.alt === 'Ricotta Batida')
    const imagenBadBunny = imagenes.find(img => img.alt === 'Queque de Limón, Almendra y Cereza')
    
    expect(imagenSoda).toHaveAttribute('src', 'https://carorocco.com/wp-content/uploads/2022/02/Ricotta-batida-IMAGEN-DESTACADA.jpg')
    expect(imagenBadBunny).toHaveAttribute('src', 'https://carorocco.com/wp-content/uploads/2022/02/Queque-de-Limon-Almendra-y-Cereza-IMAGEN-DESTACADA.jpg')
  })

  it('Link para el detalle de cada receta', () => {
    renderRecipePage()
    
    const enlaces = screen.getAllByRole('link', { name: 'Ver Receta' })
    expect(enlaces.length).toBeGreaterThanOrEqual(2)
    
    const urls = enlaces.map(enlace => enlace.getAttribute('href'))
    expect(urls).toContain('/recipes/1')
    expect(urls).toContain('/recipes/2')
  })

  it('Mostrar mensaje de carga', () => {
    renderRecipePage({ listaRecetas: [], loading: true })
    expect(screen.getByText('Cargando')).toBeInTheDocument()
  })

})