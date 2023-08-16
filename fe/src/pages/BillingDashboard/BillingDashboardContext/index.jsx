import {createContext, useState, useEffect, useCallback, useRef} from "react";
import {useGetEfficiencies} from "../../../hooks/useGetEfficiencies";
import {useGetRigs} from "../../../hooks/useGetRigs";
import {useAuth} from "../../../hooks/useAuth";
import {useSelector} from "react-redux";
import {useStatBox} from "../../../components/StatBox/useStateBox";
import {useDatesContext} from "../../../contexts/DatesContext";

export const BillingDashboardContext = createContext({});

export const BillingDashboardProvider = ({children}) => {
  const {
    startDate,
    handleStartDateChange,
    handleEndDateChange,
    endDate,
    currentDate,
  } = useDatesContext();

  const [filters, setFilters] = useState({
    start_date: startDate.toISOString().split("T")[0],
    end_date: endDate.toISOString().split("T")[0],
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

  useEffect(() => {
    refetchEfficiencies();
  }, []);

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

  return (
    <BillingDashboardContext.Provider
      value={{
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
      }}
    >
      {children}
    </BillingDashboardContext.Provider>
  );
};
