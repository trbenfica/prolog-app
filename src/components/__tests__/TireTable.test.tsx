// @ts-nocheck

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import TireTable from "../TireTable";
import * as useGetAllTiresHook from "../../hooks/useGetAllTires";

vi.mock("./AppButton", () => ({
  default: ({ onClick, children }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
}));
vi.mock("./TireFilters", () => ({
  default: ({ open }: any) =>
    open ? <div data-testid="filtros-abertos" /> : null,
}));
vi.mock("./ErrorAlert", () => ({
  default: ({ message }: any) => <div>Error: {message}</div>,
}));
vi.mock("./Loading", () => () => <div>Loading...</div>);

vi.mock("react-router", () => ({
  Link: ({ to, children }: any) => <a href={to}>{children}</a>,
}));

describe("TireTable", () => {
  const mockRefetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("exibe o componente de loading durante carregamento", () => {
    vi.spyOn(useGetAllTiresHook, "default").mockReturnValue({
      data: null,
      isPending: true,
      isError: false,
      error: null,
      refetch: mockRefetch,
      isFetching: false,
    });

    render(<TireTable />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("exibe mensagem de erro se isError for true", () => {
    vi.spyOn(useGetAllTiresHook, "default").mockReturnValue({
      data: null,
      isPending: false,
      isError: true,
      error: { message: "Erro na API" },
      refetch: mockRefetch,
      isFetching: false,
    });

    render(<TireTable />);
    expect(screen.getByTestId("error-alert")).toBeInTheDocument();
  });

  it("abre o modal de filtros ao clicar em 'Filtrar'", () => {
    vi.spyOn(useGetAllTiresHook, "default").mockReturnValue({
      data: { content: [] },
      isPending: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
      isFetching: false,
    });

    render(<TireTable />);
    const filterButton = screen.getByText(/filtrar/i);
    fireEvent.click(filterButton);
    expect(screen.getByTestId("filtro-form")).toBeInTheDocument();
  });

  it("refaz a busca ao clicar em 'Atualizar lista'", () => {
    vi.spyOn(useGetAllTiresHook, "default").mockReturnValue({
      data: { content: [] },
      isPending: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
      isFetching: false,
    });

    render(<TireTable />);
    const updateButton = screen.getByText(/atualizar lista/i);
    fireEvent.click(updateButton);
    expect(mockRefetch).toHaveBeenCalled();
  });
});
