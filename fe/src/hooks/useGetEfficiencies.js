import {useQuery} from "@tanstack/react-query";
import {AxiosEfficienciesServices} from "../services/AxiosEfficienciesServices";

export const useGetEfficiencies = (filters) => {
  const {data, isFetching, isLoading, isInitialLoading, refetch} = useQuery({
    queryKey: ["efficiencies"],
    queryFn: () => AxiosEfficienciesServices.getAll(filters),
    staleTime: Infinity,
  });

  return {
    efficiencies: data ?? [],
    isLoading: isLoading,
    isInitialLoading,
    isFetching,
    refetch,
  };
};
