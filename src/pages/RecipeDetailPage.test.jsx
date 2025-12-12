import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { MockedProvider } from '@apollo/client/testing/react'
import { MemoryRouter, Route, Routes } from 'react-router'

import { gql } from '@apollo/client'

import EventDetailPage from "./RecipeDetailPage";

const GQL_OBTENER_EVENTO_POR_ID = gql`
  query ObtenerEventoPorID($id: String!) {
    evento(id: $id) {
      nombre_evento
      tipo_evento
      fecha
      ciudad
      locacion
      hora
      descripcion
      precios
    }
  }
`;

const mocks = [{
  request: {
    query: GQL_OBTENER_EVENTO_POR_ID,
    variables: { id: "pt-001" }
  },
  result: {
    data: {
      evento: {
        nombre_evento: "Soda Stereo - Ecos",
        tipo_evento: "concierto",
        fecha: "2026-03-26",
        locacion: "Movistar Arena",
        ciudad: "Santiago",
        hora: "21:00",
        descripcion: "Espectáculo audiovisual y musical en homenaje a la legendaria banda Soda Stereo.",
        precios: {
          platea_alta: 40000,
          platea_baja: 60000,
          cancha: 85000,
          vip: 120000
        }
      }
    }
  }
}]

const renderWithRoutes = (path) => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/events/:id" element={<EventDetailPage />}/>
        </Routes>                        
      </MemoryRouter>
    </MockedProvider>
  );
};

describe('Conjunto test para el componente EventDetailPage', () => {
  
  it('Mostrar detalle de evento.', async () => {
    renderWithRoutes('/events/PT-001');
    expect(screen.getByText('Cargando detalle del evento...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Soda Stereo - Ecos')).toBeInTheDocument();
    });
    
    // Verificar elementos específicos del evento
    expect(screen.getByText('concierto')).toBeInTheDocument();
    expect(screen.getByText('Movistar Arena')).toBeInTheDocument();
    expect(screen.getByText('Santiago')).toBeInTheDocument();
    expect(screen.getByText('2026-03-26')).toBeInTheDocument();
    expect(screen.getByText('21:00')).toBeInTheDocument();
    expect(screen.getByText('Espectáculo audiovisual y musical en homenaje a la legendaria banda Soda Stereo.')).toBeInTheDocument();
    expect(screen.getByText('$40.000')).toBeInTheDocument();
    expect(screen.getByText('$60.000')).toBeInTheDocument();
    expect(screen.getByText('$85.000')).toBeInTheDocument();
    expect(screen.getByText('$120.000')).toBeInTheDocument();
  })

})