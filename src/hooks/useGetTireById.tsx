import { useQuery } from "@tanstack/react-query";
import { Tire } from "../types/types";
import { getTireById } from "../queries/tire.queries";

const useGetTireById = (tireId: Tire["id"]) => {
  const query = useQuery({
    queryKey: ["tires", tireId],
    queryFn: () => getTireById(tireId),
  });

  return { ...query };
};

export default useGetTireById;
