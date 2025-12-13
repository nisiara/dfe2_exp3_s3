import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router";

import Footer from './Footer'

const renderComponent = () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
};

describe('Conjunto test componente Footer: ', () => {
  afterEach(cleanup)

  it('Carga inicial componente', () => {
    renderComponent()
  })

  it('Verificar ruta home', () => {
      renderComponent()
      const enlaceHome = screen.getByRole('link', { name: /inicio/i })
      expect(enlaceHome).toHaveAttribute('href', '/');
    })
  
    it('Verificar ruta recetas', () => {
      renderComponent()
      const enlaceRecetas = screen.getByRole('link', { name: /Todas las recetas/i })
      expect(enlaceRecetas).toHaveAttribute('href', '/recipes');
    })
  
    it('Verificar ruta nosotros', () => {
      renderComponent()
      const enlaceNosotros = screen.getByRole('link', { name: /Nosotros/i })
      expect(enlaceNosotros).toHaveAttribute('href', '/about-us');
    })

} )