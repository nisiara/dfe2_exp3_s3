import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";

import HomePage from "./HomePage";

describe('Conjunto de tests para componente HomePage: ', () => {
  afterEach(cleanup)

  it('Carga inicial componente.', () => {
    render(<HomePage/>)
  })

  it('Mostrar imagen de portada.', () => {
    render(<HomePage/>)
    const imagenPortada = screen.getByRole('img', { name: 'Portada Milk & Crumbs' })
    expect(imagenPortada).toBeInTheDocument()

  })

  it('Verificar ruta image portada', () => {
    render(<HomePage/>)
    const imagenPortada = screen.getByAltText('Portada Milk & Crumbs');
    expect(imagenPortada).toHaveAttribute('src', 'https://carorocco.com/wp-content/uploads/2021/06/Galletas-Crinkle-Pink-Lemonade-IMAGEN-DESTACADA.jpg')
  })


})