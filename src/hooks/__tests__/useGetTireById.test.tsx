import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useGetTireById from "../useGetTireById";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("../../queries/tire.queries", () => ({
  getTireById: vi.fn(),
}));

import { getTireById } from "../../queries/tire.queries";

const createTestClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = createTestClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe("useGetTireById", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("retorna dados corretamente quando a API responde", async () => {
    const mockTire = { id: 42, brand: "Goodyear", size: "195/65 R15" };
    (getTireById as ReturnType<typeof vi.fn>).mockResolvedValue(mockTire);

    const { result } = renderHook(() => useGetTireById(42), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockTire);
    expect(getTireById).toHaveBeenCalledWith(42);
  });

  it("retorna erro quando a API falha", async () => {
    (getTireById as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("Erro de API")
    );

    const { result } = renderHook(() => useGetTireById(42), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("Erro de API");
  });

  it("não executa a query quando tireId é NaN", async () => {
    const { result } = renderHook(() => useGetTireById(NaN), { wrapper });

    expect(result.current.status).toBe("pending");
    expect(getTireById).not.toHaveBeenCalled();
  });
});
