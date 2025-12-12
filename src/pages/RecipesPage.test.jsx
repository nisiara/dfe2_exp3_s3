import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { MemoryRouter } from 'react-router'

import EventsPage from "./EventsPage"

const mockEventos = [
  {
    id: "PT-001",
    nombre_evento: 'Soda Stereo - Ecos',
    tipo_evento: 'concierto',
    locacion: 'Movistar Arena',
    ciudad: 'Santiago',
    fecha: '2026-03-26',
    imagen_url: "https://static.ptocdn.net/images/eventos/lot210_calugalistado.jpg"
  },
  {
    id: "PT-010",
    nombre_evento: "Bad Bunny - DeBÍ TiRAR MáS FOToS World Tour",
    tipo_evento: "concierto",
    locacion: "Quinta Vergara",
    ciudad: "Viña del Mar",
    fecha: "2026-01-09",
    imagen_url: "https://static.ptocdn.net/images/eventos/biz322_calugalistado.jpg"
  }
]

const renderEventsPage = (props) => {
  render(
    <MemoryRouter>
      <EventsPage {...props} />
    </MemoryRouter>
  )
}

describe('Conjunto de tests para el componente EventsPage', () => {
  
  afterEach(cleanup)
  
  it('Mostrar mensaje de carga', () => {
    renderEventsPage({ 
      loading: true, 
      listaEventos: [], 
      error: null 
    })
    expect(screen.getByText('Cargando lista de eventos')).toBeInTheDocument()
  })

  it('Mostrar lista de eventos', () => {
    renderEventsPage({ 
      loading: false, 
      listaEventos: mockEventos, 
      error: null 
    })
    
    expect(screen.getByText('Soda Stereo - Ecos')).toBeInTheDocument()
    expect(screen.getByText('Bad Bunny - DeBÍ TiRAR MáS FOToS World Tour')).toBeInTheDocument()
    expect(screen.getByText(/Movistar Arena/i)).toBeInTheDocument()
    expect(screen.getByText(/Quinta vergara/i)).toBeInTheDocument()
    expect(screen.getByText(/Santiago/i)).toBeInTheDocument()
    expect(screen.getByText(/viña del mar/i)).toBeInTheDocument()
  })

  it('Link apunta al detalle del evento"', () => {
    renderEventsPage({ 
      loading: false, 
      listaEventos: mockEventos, 
      error: null 
    })
    
    const enlaces = screen.getAllByRole('link', { name: 'Ver Evento' })
    expect(enlaces).toHaveLength(2)
    
    const urls = enlaces.map(enlace => enlace.getAttribute('href'))
    expect(urls).toContain('/events/PT-001')
    expect(urls).toContain('/events/PT-010')
  })

  it('Mostrar la imagen de cada evento', () => {
    renderEventsPage({ 
      loading: false, 
      listaEventos: mockEventos, 
      error: null 
    })
    const imagenes = screen.getAllByRole('img')
    const imagenSoda = imagenes.find(img => img.alt === 'Soda Stereo - Ecos')
    const imagenJazz = imagenes.find(img => img.alt === 'Bad Bunny - DeBÍ TiRAR MáS FOToS World Tour')
    
    expect(imagenSoda).toHaveAttribute('src', 'https://static.ptocdn.net/images/eventos/lot210_calugalistado.jpg')
    expect(imagenJazz).toHaveAttribute('src', 'https://static.ptocdn.net/images/eventos/biz322_calugalistado.jpg')
  })


})
