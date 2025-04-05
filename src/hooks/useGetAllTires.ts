import { useQuery } from "@tanstack/react-query";
import { TireRequestParams } from "../types/types";
import { getAllTires } from "../queries/tire.queries";

const useGetAllTires = (params?: Partial<TireRequestParams>) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["tires", params],
    queryFn: () => getAllTires(params ?? {}),
  });

  return { data, isPending, isError, error, refetch };
};

export default useGetAllTires;
