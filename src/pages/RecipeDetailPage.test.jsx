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
  delay: 100,
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


const mocksError = [
  {
    request: {
      query: GQL_OBTENER_RECETA_POR_ID,
      variables: { id: "2" },
    },
    error: new Error("Network error"),
  },
];

const mocksRecetaNoEncontrada = [{
  request: {
    query: GQL_OBTENER_RECETA_POR_ID,
    variables: { id: "999"}
  },
  result: {
    data: {
      receta: null
    }
  }
}]


const renderWithRoutes = (path, customMocks = mocks) => {
  render(
    <MockedProvider mocks={customMocks}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/recipes/:id" element={<RecipeDetailPage />}/>
        </Routes>                        
      </MemoryRouter>
    </MockedProvider>
  );
};

describe('Conjunto test para el componente RecipeDetailPage', () => {

  it('Mostrar mensaje de carga', () => {
      renderWithRoutes('/recipes/1');
      expect(screen.getByText(/Cargando/i)).toBeInTheDocument()
    })
  
  it('Mostrar detalle de la receta.', async () => {
    renderWithRoutes('/recipes/1');
    
    await waitFor(() => {
      expect(screen.getAllByText('Ricotta Batida')[0]).toBeInTheDocument();
    });
    
    expect(screen.getAllByText('Una receta de picoteo distinta, rica y muy fácil, que está lista en sólo 20 minutos o menos. Perfecta para tablas de picoteo.')[0]).toBeInTheDocument();
    expect(screen.getAllByText('20 min')[0]).toBeInTheDocument();
    expect(screen.getAllByText('0 min')[0]).toBeInTheDocument();
    expect(screen.getAllByText('4')[0]).toBeInTheDocument();
  })

  it('No encuentra la receta', async () => {
    renderWithRoutes('/recipes/999', mocksRecetaNoEncontrada);
    expect(screen.queryByText(/Cargando/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText(/No se encontró receta con el ID: 999/i)).toBeInTheDocument();
    });
  })

  

  it('Mostrar todas las categorías', async () => {
    renderWithRoutes('/recipes/1');
    
    await waitFor(() => {
      expect(screen.getAllByText('Salado')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Picoteo')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Vegetariano')[0]).toBeInTheDocument();
    });
  })

  it('Mostrar todos los ingredientes', async () => {
    renderWithRoutes('/recipes/1');
    
    await waitFor(() => {
      expect(screen.getAllByText('Ricotta')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Aceite de oliva')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Hierbas frescas')[0]).toBeInTheDocument();
    });
  })

  it('Mostrar Instrucciones', async () => {
    renderWithRoutes('/recipes/1');
    
    await waitFor(() => {
      expect(screen.getAllByText(/Batir la ricotta/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Extender en un plato/i)[0]).toBeInTheDocument();
    });
  })

  it('Mostrar observaciones', async () => {
    renderWithRoutes('/recipes/1');
    
    await waitFor(() => {
      expect(screen.getAllByText(/Puedes agregar un toque de miel/i)[0]).toBeInTheDocument();
    });
  })

  it("Muestra mensaje de error cuando la consulta falla", async () => {
    renderWithRoutes("/recipes/2", mocksError);

    // Estado de error
    await waitFor(() => {
      expect(screen.getByText(/Error al cargar la receta/i)).toBeInTheDocument();
      expect(screen.getByText(/Network error/i)).toBeInTheDocument();
    });
  });

})