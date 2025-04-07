import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useGetAllTires from "../useGetAllTires";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("../../queries/tire.queries", () => ({
  getAllTires: vi.fn(),
}));

import { getAllTires } from "../../queries/tire.queries";

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe("useGetAllTires", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("retorna os dados corretamente quando a API responde com sucesso", async () => {
    const mockData = [{ id: 1, brand: "Pirelli", size: "205/55 R16" }];
    (getAllTires as ReturnType<typeof vi.fn>).mockResolvedValue(mockData);

    const { result } = renderHook(() => useGetAllTires(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(getAllTires).toHaveBeenCalledWith({});
  });

  it("passa os parâmetros corretamente para a query", async () => {
    const params = { textQuery: "test" };
    (getAllTires as ReturnType<typeof vi.fn>).mockResolvedValue([]);

    const { result } = renderHook(() => useGetAllTires(params), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(getAllTires).toHaveBeenCalledWith(params);
  });

  it("lida com erro da API", async () => {
    (getAllTires as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("Erro de API")
    );

    const { result } = renderHook(() => useGetAllTires(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("Erro de API");
  });
});
