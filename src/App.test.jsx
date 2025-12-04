import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router'
import EventsPage from './pages/EventsPage'

// Array de eventos para pasar directamente al componente
const mockEventos = [{
  id: 'PT-001',
  nombre_evento: 'Soda Stereo - Ecos',
  tipo_evento: 'concierto',
  locacion: 'Movistar Arena',
  ciudad: 'Santiago', 
  fecha: '2026-03-26',
  imagen_url: 'https://static.ptocdn.net/images/eventos/lot210_calugalistado.jpg'
}, 
{
  id: 'PT-010',
  nombre_evento: 'Bad Bunny - DeBÍ TiRAR MáS FOToS World Tour',
  tipo_evento: 'concierto',
  locacion: 'Quinta Vergara',
  ciudad: 'Viña del Mar', 
  fecha: '2026-01-09',
  imagen_url: 'https://static.ptocdn.net/images/eventos/biz322_calugalistado.jpg'
}]

// Función helper para renderizar el componente EventsPage
const renderEventsPage = (props = {}) => {
  const defaultProps = {
    listaEventos: mockEventos,
    loading: false,
    error: null,
    ...props
  }
  
  return render(
    <MemoryRouter>
      <EventsPage {...defaultProps} />
    </MemoryRouter>
  )
}


describe('Conjunto de tests para el componente App', () => {
  
  it('Pasar los eventos como props', () => {
    renderEventsPage()
    expect(screen.getByText('Soda Stereo - Ecos')).toBeInTheDocument()
    expect(screen.getByText('Bad Bunny - DeBÍ TiRAR MáS FOToS World Tour')).toBeInTheDocument()
    expect(screen.getByText(/Movistar Arena/i)).toBeInTheDocument()
    expect(screen.getByText(/Quinta Vergara/i)).toBeInTheDocument()
  })

  it('Mostrar las imágenes de los eventos', () => {
    renderEventsPage()
    
    const imagenes = screen.getAllByRole('img')
    const imagenSoda = imagenes.find(img => img.alt === 'Soda Stereo - Ecos')
    const imagenBadBunny = imagenes.find(img => img.alt === 'Bad Bunny - DeBÍ TiRAR MáS FOToS World Tour')
    
    expect(imagenSoda).toHaveAttribute('src', 'https://static.ptocdn.net/images/eventos/lot210_calugalistado.jpg')
    expect(imagenBadBunny).toHaveAttribute('src', 'https://static.ptocdn.net/images/eventos/biz322_calugalistado.jpg')
  })

  it('Link para el detalle de cada evento', () => {
    renderEventsPage()
    
    const enlaces = screen.getAllByRole('link', { name: 'Ver Evento' })
    expect(enlaces.length).toBeGreaterThanOrEqual(2)
    
    const urls = enlaces.map(enlace => enlace.getAttribute('href'))
    expect(urls).toContain('/events/PT-001')
    expect(urls).toContain('/events/PT-010')
  })

  it('Mostrar mensaje de carga', () => {
    renderEventsPage({ listaEventos: [], loading: true })
    expect(screen.getByText('Cargando lista de eventos')).toBeInTheDocument()
  })

})