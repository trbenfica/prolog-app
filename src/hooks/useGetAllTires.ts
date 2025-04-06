import { useQuery } from "@tanstack/react-query";
import { TireRequestParams } from "../types/types";
import { getAllTires } from "../queries/tire.queries";

const useGetAllTires = (params?: Partial<TireRequestParams>) => {
  const query = useQuery({
    queryKey: ["tires", params],
    queryFn: () => getAllTires(params ?? {}),
  });

  return { ...query };
};

export default useGetAllTires;
