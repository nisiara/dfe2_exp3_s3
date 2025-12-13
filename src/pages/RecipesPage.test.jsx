import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { MemoryRouter } from 'react-router'

import RecipesPage from "./RecipesPage"

const mockRecetas = [
  {
    id: 1,
    nombre: "Ricotta Batida",
    imagen: "https://carorocco.com/wp-content/uploads/2022/02/Ricotta-batida-IMAGEN-DESTACADA.jpg",
    categorias: [
      "Salado",
      "Picoteo",
      "Vegetariano"
    ],
  },
  {
    id: 2,
    nombre: "Queque de Limón, Almendra y Cereza",
    imagen: "https://carorocco.com/wp-content/uploads/2022/02/Queque-de-Limon-Almendra-y-Cereza-IMAGEN-DESTACADA.jpg",
    categorias: [
      "Dulce",
      "Queques",
      "Hora del té"
    ],
  },
]

const renderRecipePage = (props) => {
  render(
    <MemoryRouter>
      <RecipesPage {...props} />
    </MemoryRouter>
  )
}

describe('Conjunto de tests para el componente RecipesPage', () => {
  
  afterEach(cleanup)
  
  it('Mostrar mensaje de carga', () => {
    renderRecipePage({ 
      loading: true, 
      listaEventos: [], 
      error: null 
    })
    expect(screen.getByText('Cargando')).toBeInTheDocument()
  })

  it('Mostrar lista de recetas', () => {
    renderRecipePage({ 
      loading: false, 
      listaRecetas: mockRecetas, 
      error: null 
    })
    
    expect(screen.getByText('Ricotta Batida')).toBeInTheDocument()
    expect(screen.getByText(/Salado/i)).toBeInTheDocument()
    expect(screen.getByText(/Picoteo/i)).toBeInTheDocument()
    expect(screen.getByText(/Vegetariano/i)).toBeInTheDocument()

    expect(screen.getByText('Queque de Limón, Almendra y Cereza')).toBeInTheDocument()
    expect(screen.getByText(/Dulce/i)).toBeInTheDocument()
    expect(screen.getByText(/Queques/i)).toBeInTheDocument()
    expect(screen.getByText(/Hora del té/i)).toBeInTheDocument()
  })

  it('Mostrar la imagen de cada receta', () => {
    renderRecipePage({ 
      loading: false, 
      listaRecetas: mockRecetas, 
      error: null 
    })
    const imagenes = screen.getAllByRole('img')
    const imagenSoda = imagenes.find(img => img.alt === 'Ricotta Batida')
    const imagenJazz = imagenes.find(img => img.alt === 'Queque de Limón, Almendra y Cereza')
    
    expect(imagenSoda).toHaveAttribute('src', 'https://carorocco.com/wp-content/uploads/2022/02/Ricotta-batida-IMAGEN-DESTACADA.jpg')
    expect(imagenJazz).toHaveAttribute('src', 'https://carorocco.com/wp-content/uploads/2022/02/Queque-de-Limon-Almendra-y-Cereza-IMAGEN-DESTACADA.jpg')
  })

  it('Mostrar nombre de cada receta', () => {
    renderRecipePage({ 
      loading: false, 
      listaRecetas: mockRecetas, 
      error: null 
    })
    const nombresRecetas = screen.getAllByRole('heading', { level: 3 })
    const nombreReceta1 = nombresRecetas.find(nombre => nombre.textContent === 'Ricotta Batida')
    const nombreReceta2 = nombresRecetas.find(nombre => nombre.textContent === 'Queque de Limón, Almendra y Cereza')
    
    expect(nombreReceta1).toHaveTextContent('Ricotta Batida')
    expect(nombreReceta2).toHaveTextContent('Queque de Limón, Almendra y Cereza')
  })

  it('Link apunta al detalle de la receta', () => {
    renderRecipePage({ 
      loading: false, 
      listaRecetas: mockRecetas, 
      error: null 
    })
    
    const enlaces = screen.getAllByRole('link', { name: 'Ver Receta' })
    expect(enlaces).toHaveLength(2)
    
    const urls = enlaces.map(enlace => enlace.getAttribute('href'))
    expect(urls).toContain('/recipes/1')
    expect(urls).toContain('/recipes/2')
  })

  it('Manejar lista de recetas vacía o null', () => {
    renderRecipePage({ 
      loading: false, 
      listaRecetas: null, 
      error: null 
    })
    
    expect(screen.queryByText('Ricotta Batida')).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Ver Receta' })).not.toBeInTheDocument()
  })


})
