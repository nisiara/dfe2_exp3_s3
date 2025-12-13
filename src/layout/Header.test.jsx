import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router";

import Header from "./Header";

const renderComponent = () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
};

describe('Conjunto de test para componente Header: ', () => {
  afterEach(cleanup)

  it('Carga inicial componente.',  () => {
    renderComponent()
  })

  it('Mostrar logo.', () => {
    renderComponent()
    const logo = screen.getByRole('img', { name: 'Logo Milk & Crumbs' })
    expect(logo).toBeDefined()

  })

  it('Verificar ruta logo', () => {
    renderComponent()
    const logo = screen.getByRole('img', { name: 'Logo Milk & Crumbs' })
    expect(logo).toHaveAttribute('src', '/images/logo.png')
  })

  it('Verificar ruta home', () => {
    renderComponent()
    const enlaceHome = screen.getByRole('link', { name: /inicio/i })
    expect(enlaceHome).toHaveAttribute('href', '/');
  })

  it('Verificar ruta eventos', () => {
    renderComponent()
    const enlaceRecetas = screen.getByRole('link', { name: /Ver todas las recetas/i })
    expect(enlaceRecetas).toHaveAttribute('href', '/recipes');
  })

  it('Verificar ruta nosotros', () => {
    renderComponent()
    const enlaceNosotros = screen.getByRole('link', { name: /Nosotros/i })
    expect(enlaceNosotros).toHaveAttribute('href', '/about-us');
  })

  it('Aplica solo la clase base cuando la ruta no coincide', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    const enlaceRecetas = screen.getByRole('link', { name: /Ver todas las recetas/i });
    expect(enlaceRecetas).toHaveClass('text-lg px-2 py-1 block font-extrabold text-indigo-900');
    expect(enlaceRecetas).not.toHaveClass('border-b-2 border-b-indigo-900');
  });


  it('Aplica clase "active" en la ruta "Inicio"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    const enlaceInicio = screen.getByRole('link', { name: /Inicio/i });
    expect(enlaceInicio).toHaveClass('text-lg px-2 py-1 block font-extrabold text-indigo-900');
    expect(enlaceInicio).toHaveClass('border-b-2 border-b-indigo-900');
  });

  it('Aplica clase "active" en la ruta de "Ver todos las recetas"', () => {
    render(
      <MemoryRouter initialEntries={['/recipes']}>
        <Header />
      </MemoryRouter>
    );

    const enlaceRecetas = screen.getByRole('link', { name: /Ver todas las recetas/i });
    expect(enlaceRecetas).toHaveClass('border-b-2 border-b-indigo-900');
    expect(enlaceRecetas).toHaveClass('text-lg px-2 py-1 block font-extrabold text-indigo-900');
  });


  it('Aplica clase "active" en la ruta "Nosotros" ', () => {
    render(
      <MemoryRouter initialEntries={['/about-us']}>
        <Header />
      </MemoryRouter>
    );

    const navLinkNosotros = screen.getByRole('link', { name: /Nosotros/i });
    expect(navLinkNosotros).toHaveClass('border-b-2 border-b-indigo-900'); 
  })

  it('No aplicar estilo "active" en sub-rutas (atributo: end)', () => {
    render(
      <MemoryRouter initialEntries={['/events/details']}>
        <Header />
      </MemoryRouter>
    );

    const enlaceRecetas = screen.getByRole('link', { name: /Ver todas las recetas/i });
    expect(enlaceRecetas).not.toHaveClass('border-b-2 border-b-indigo-900');
    expect(enlaceRecetas).toHaveClass('text-lg px-2 py-1 block font-extrabold text-indigo-900');
  });

})
