import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Loading from "./Loading";

describe('Conjunto test para el componente Loading', () => {
  
 it("Renderiza el componente Loading correctamente", () => {
    render(<Loading />);
    expect(screen.getByText("Cargando")).toBeInTheDocument();
  });

});
