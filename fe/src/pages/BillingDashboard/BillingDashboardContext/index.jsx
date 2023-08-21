//React
import {createContext, useState, useEffect, useCallback, useRef} from "react";

//Hooks
import {useGetEfficiencies} from "../../../hooks/useGetEfficiencies";
import {useGetRigs} from "../../../hooks/useGetRigs";
import {useDatesContext} from "../../../contexts/DatesContext";

//Components
import {useBarChart} from "../components/BarChart/useBarChart";

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

  const {totalValue} = useBarChart(efficiencies, "invoicing");

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
  }, [filters, refetchEfficiencies]);

  useEffect(() => {
    refetchEfficiencies();
  }, [refetchEfficiencies]);

  const handleStartDateFiltersChange = useCallback(
    (startDate) => {
      handleStartDateChange(startDate);
      setFilters((prevState) => ({
        ...prevState,
        start_date: startDate.toISOString().split("T")[0],
      }));
    },
    [handleStartDateChange]
  );

  const handleEndDateFiltersChange = useCallback(
    (endDate) => {
      handleEndDateChange(endDate);
      setFilters((prevState) => ({
        ...prevState,
        end_date: endDate.toISOString().split("T")[0],
      }));
    },
    [handleEndDateChange]
  );

  return (
    <BillingDashboardContext.Provider
      value={{
        efficiencies,
        rigs,
        isLoading:
          isFetchingEfficiencies ||
          isFetchingRigs ||
          isLoadingEfficiencies ||
          isLoadingRigs,
        handleEndDateChange,
        handleStartDateChange,
        startDate,
        endDate,
        currentDate,
        handleStartDateFiltersChange,
        handleEndDateFiltersChange,
        totalValue,
      }}
    >
      {children}
    </BillingDashboardContext.Provider>
  );
};
