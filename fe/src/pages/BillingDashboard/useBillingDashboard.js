import {useGetEfficiencies} from "../../hooks/useGetEfficiencies";
import {useDatesContext} from "../../contexts/DatesContext";
import {useState, useEffect, useCallback, useRef} from "react";
import {useGetRigs} from "../../hooks/useGetRigs";

export const useBillingDashboard = () => {
  const {
    startDate,
    handleStartDateChange,
    handleEndDateChange,
    endDate,
    currentDate,
  } = useDatesContext();

  const [filters, setFilters] = useState({
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date().toISOString().split("T")[0],
  });

  const prevFiltersRef = useRef({
    start_date: filters.start_date,
    end_date: filters.end_date,
  });

  const {
    efficiencies,
    isLoading: isLoadingEfficiencies,
    refetch: refetchEfficiencies,
    isFetching: isFetchingEfficiencies,
  } = useGetEfficiencies(filters);

  const {
    rigs,
    isLoading: isLoadingRigs,
    isFetching: isFetchingRigs,
  } = useGetRigs();

  useEffect(() => {
    if (
      prevFiltersRef.current.start_date !== filters.start_date ||
      prevFiltersRef.current.end_date !== filters.end_date
    ) {
      refetchEfficiencies();
    }

    // Atualiza as referências dos filtros anteriores
    prevFiltersRef.current.start_date = filters.start_date;
    prevFiltersRef.current.end_date = filters.end_date;
  }, [filters]);

  const handleStartDateFiltersChange = useCallback((startDate) => {
    handleStartDateChange(startDate);
    setFilters((prevState) => ({
      ...prevState,
      start_date: startDate.toISOString().split("T")[0],
    }));
  }, []);

  const handleEndDateFiltersChange = useCallback((endDate) => {
    handleEndDateChange(endDate);
    setFilters((prevState) => ({
      ...prevState,
      end_date: endDate.toISOString().split("T")[0],
    }));
  }, []);

  return {
    efficiencies,
    rigs,
    isLoading: isFetchingEfficiencies,
    handleEndDateChange,
    handleStartDateChange,
    startDate,
    endDate,
    currentDate,
    handleStartDateFiltersChange,
    handleEndDateFiltersChange,
  };
};
