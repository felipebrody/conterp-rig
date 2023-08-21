import {useGetEfficiencies} from "../../hooks/useGetEfficiencies";
import {useDatesContext} from "../../contexts/DatesContext";
import {useState, useEffect, useCallback, useRef} from "react";
import {useAuth} from "../../hooks/useAuth";
import {useSelector} from "react-redux";
import {useEfficienciesDataGrid} from "./components/EfficienciesDataGrid/useEfficienciesDataGrid";

export const useEfficiencies = () => {
  const user = useSelector((state) => state.user);

  const [filters, setFilters] = useState({
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date().toISOString().split("T")[0],
    rig_id: user?.rig_id ? user?.rig_id : null,
  });
  const {
    startDate,
    handleStartDateChange,
    handleEndDateChange,
    endDate,
    currentDate,
  } = useDatesContext();

  const {
    efficiencies,
    isLoading: isLoadingEfficiencies,
    refetch: refetchEfficiencies,
    isFetching: isFetchingEfficiencies,
  } = useGetEfficiencies(filters);

  const formattedItems = useEfficienciesDataGrid(efficiencies);

  const {isUserAdm} = useAuth();

  const prevFiltersRef = useRef({
    start_date: filters.start_date,
    end_date: filters.end_date,
    rig_id: filters.rig_id,
  });

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

    isLoading: isFetchingEfficiencies,
    handleEndDateChange,
    handleStartDateChange,
    startDate,
    endDate,
    currentDate,
    handleStartDateFiltersChange,
    handleEndDateFiltersChange,
    formattedItems,
    isUserAdm,
  };
};
