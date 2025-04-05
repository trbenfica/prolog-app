import api from "../config/api";
import { env } from "../config/config";
import { Tire, TireRequestParams, TireResponse } from "../types/types";

export const getAllTires = ({
  pageSize = 10,
  pageNumber = 0,
  ...rest
}: Partial<TireRequestParams>): Promise<TireResponse> => {
  const branchOfficesId = env.VITE_BRANCH_OFFICES_ID;

  return api
    .get("/tires", {
      params: {
        branchOfficesId,
        pageSize,
        pageNumber,
        ...rest,
      },
    })
    .then((response) => response.data)
    .catch((err) => {
      console.error("Erro ao buscar pneus:", err);
      throw err;
    });
};

export const getTireById = (id: Tire["id"]): Promise<Tire> => {
  return api.get(`/tires/${id}`);
};
