import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { TireDetails } from "./TireDetails";
import useGetTireById from "../hooks/useGetTireById";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("../hooks/useGetTireById", () => ({
  default: vi
    .fn()
    .mockReturnValue({ data: {}, isPending: true, isError: true, error: "" }),
}));

vi.mock("../Loading", () => ({
  default: () => <div data-testid="loading">Loading...</div>,
}));

vi.mock("../ErrorAlert", () => ({
  default: ({ message }: { message: string }) => (
    <div data-testid="error-alert">{message}</div>
  ),
}));

const mockTireData = {
  id: 1,
  serialNumber: "123ABC",
  additionalId: "ADD456",
  companyGroupName: "Grupo X",
  branchOfficeName: "Filial Y",
  currentLifeCycle: "Novo",
  timesRetreaded: 0,
  maxRetreadsExpected: 3,
  currentPressure: 30,
  recommendedPressure: 32,
  middleInnerTreadDepth: 8,
  outerTreadDepth: 7,
  middleOuterTreadDepth: 7,
  innerTreadDepth: 6,
  dot: "DOT2024",
  purchaseCost: 1200.5,
  newTire: true,
  status: "Ativo",
  createdAt: new Date().toISOString(),
  make: { name: "Marca X" },
  model: { name: "Modelo Y" },
  tireSize: { height: 70, width: 215 },
  installed: {
    installedPosition: "Traseira Direita",
    licensePlate: "ABC-1234",
  },
  disposal: null,
  analysis: null,
};

const renderWithRouter = (tireId: string) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[`/tires/${tireId}`]}>
        <Routes>
          <Route path="/tires/:tireId" element={<TireDetails />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe("TireDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("exibe erro se tireId for inválido", () => {
    renderWithRouter("invalid");

    expect(screen.getByTestId("error-alert")).toHaveTextContent(
      "error: tireId is invalid"
    );
  });

  it("exibe loading se a query estiver carregando", () => {
    (useGetTireById as any).mockReturnValue({
      isPending: true,
      isError: false,
    });

    renderWithRouter("1");

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("exibe erro se a query falhar", () => {
    (useGetTireById as any).mockReturnValue({
      isPending: false,
      isError: true,
      error: { message: "Erro na API" },
    });

    renderWithRouter("1");

    expect(screen.getByTestId("error-alert")).toHaveTextContent("Erro na API");
  });

  it("exibe tabela com dados do pneu quando a query tem sucesso", () => {
    (useGetTireById as any).mockReturnValue({
      isPending: false,
      isError: false,
      data: mockTireData,
    });

    renderWithRouter("1");

    expect(screen.getByTestId("tire-details-table")).toBeInTheDocument();
    expect(screen.getByText("Detalhes do Pneu")).toBeInTheDocument();
    expect(screen.getByText("Número de Série")).toBeInTheDocument();
    expect(screen.getByText("123ABC")).toBeInTheDocument();
    expect(screen.getByText("Veículo")).toBeInTheDocument();
    expect(screen.getByText("ABC-1234")).toBeInTheDocument();
  });
});
