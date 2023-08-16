import {useQuery} from "@tanstack/react-query";
import {AxiosRigsServices} from "../services/AxiosRigsServices";

export const useGetRigs = () => {
  const {data, isFetching, isLoading, isInitialLoading, refetch} = useQuery({
    queryKey: ["rigs"],
    queryFn: AxiosRigsServices.getAll,
    staleTime: Infinity,
  });

  return {
    rigs: data ?? [],
    isLoading,
    isFetching,
    isInitialLoading,
    refetch,
  };
};
