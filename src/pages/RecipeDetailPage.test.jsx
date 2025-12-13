import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { MockedProvider } from '@apollo/client/testing/react'
import { MemoryRouter, Route, Routes } from 'react-router'

import { gql } from '@apollo/client'

import RecipeDetailPage from "./RecipeDetailPage";

const GQL_OBTENER_RECETA_POR_ID = gql`
  query ObtenerRecetaPorID($id: ID!) {
    receta(id: $id) {
      imagen
      nombre
      descripcion
      ingredientes
      tiempoPreparacion
      tiempoCoccion
      cantidadPorciones
      categorias
      procedimiento
      observaciones
    }
  }
`;

const mocks = [{
  request: {
    query: GQL_OBTENER_RECETA_POR_ID,
    variables: { id: "1"}
  },
  result: {
    data: {
      receta: {
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
      }
    }
  }
}]

const renderWithRoutes = (path) => {
  render(
    <MockedProvider mocks={mocks}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/recipes/:id" element={<RecipeDetailPage />}/>
        </Routes>                        
      </MemoryRouter>
    </MockedProvider>
  );
};

describe('Conjunto test para el componente RecipeDetailPage', () => {
  
  it('Mostrar detalle de la receta.', async () => {
    renderWithRoutes('/recipes/1');
    expect(screen.getByText('Cargando')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Ricotta Batida')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Una receta de picoteo distinta, rica y muy fácil, que está lista en sólo 20 minutos o menos. Perfecta para tablas de picoteo.')).toBeInTheDocument();
    expect(screen.getByText('20 min')).toBeInTheDocument();
    expect(screen.getByText('0 min')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    // expect(screen.getByText('21:00')).toBeInTheDocument();
    // expect(screen.getByText('Espectáculo audiovisual y musical en homenaje a la legendaria banda Soda Stereo.')).toBeInTheDocument();
    // expect(screen.getByText('$40.000')).toBeInTheDocument();
    // expect(screen.getByText('$60.000')).toBeInTheDocument();
    // expect(screen.getByText('$85.000')).toBeInTheDocument();
    // expect(screen.getByText('$120.000')).toBeInTheDocument();
  })

})