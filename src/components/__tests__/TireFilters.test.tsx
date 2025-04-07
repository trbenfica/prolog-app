// TireFilters.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import TireFilters from "../TireFilters";
import { describe, it, vi, expect } from "vitest";

describe("TireFilters", () => {
  const mockApplyFilter = vi.fn();
  const mockHandleClose = vi.fn();

  const defaultProps = {
    applyFilter: mockApplyFilter,
    initialState: {
      textQuery: "",
      serialNumberTextQuery: "",
      makeIds: [],
      modelIds: [],
      treadMakeId: undefined,
      treadModelId: undefined,
      currentLifeCycles: [],
      dimensionsIds: [],
    },
    open: true,
    handleClose: mockHandleClose,
  };

  it("renderiza o formulário quando open = true", () => {
    render(<TireFilters {...defaultProps} />);
    expect(screen.getByTestId("filtro-form")).toBeInTheDocument();
  });

  it("chama applyFilter e handleClose ao clicar em 'Aplicar Filtros'", () => {
    render(<TireFilters {...defaultProps} />);
    const applyBtn = screen.getByText(/aplicar filtros/i);
    fireEvent.click(applyBtn);
    expect(mockApplyFilter).toHaveBeenCalled();
    expect(mockHandleClose).toHaveBeenCalled();
  });

  it("chama applyFilter com {} ao clicar em 'Remover Filtros'", () => {
    render(<TireFilters {...defaultProps} />);
    const removeBtn = screen.getByText(/remover filtros/i);
    fireEvent.click(removeBtn);
    expect(mockApplyFilter).toHaveBeenCalledWith({});
    expect(mockHandleClose).toHaveBeenCalled();
  });

  it("chama apenas handleClose ao clicar em 'Cancelar'", () => {
    render(<TireFilters {...defaultProps} />);
    const cancelBtn = screen.getByText(/cancelar/i);
    fireEvent.click(cancelBtn);
    expect(mockHandleClose).toHaveBeenCalled();
  });

  it("atualiza o valor de 'Número de série'", () => {
    render(<TireFilters {...defaultProps} />);
    const input = screen.getByLabelText("Número de série") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "abc123" } });
    expect(input.value).toBe("abc123");
  });
});
