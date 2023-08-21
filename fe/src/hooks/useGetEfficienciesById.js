import {useQuery} from "@tanstack/react-query";
import {AxiosEfficienciesServices} from "../services/AxiosEfficienciesServices";

export const useGetEfficienciesById = (id) => {
  const {data, isFetching, isLoading, isInitialLoading, refetch} = useQuery({
    queryKey: ["efficiency"],
    queryFn: () => AxiosEfficienciesServices.getById(id),
    staleTime: Infinity,
  });

  return {
    efficiency: data ?? [],
    isLoading: isLoading,
    isInitialLoading,
    isFetching,
    refetch,
  };
};
