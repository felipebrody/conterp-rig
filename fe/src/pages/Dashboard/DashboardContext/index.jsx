import {createContext, useState, useEffect, useCallback} from "react";
import {useGetEfficiencies} from "../../../hooks/useGetEfficiencies";
import {useGetRigs} from "../../../hooks/useGetRigs";
import {useAuth} from "../../../hooks/useAuth";
import {useSelector} from "react-redux";
import {useStatBox} from "../../../components/StatBox/useStateBox";
import {useDatesContext} from "../../../contexts/DatesContext";

export const DashboardContext = createContext({});

export const DashboardProvider = ({children}) => {
  const {isUserAdm} = useAuth();
  const user = useSelector((state) => state.user);
  const {
    startDate,
    handleStartDateChange,
    handleEndDateChange,
    endDate,
    currentDate,
  } = useDatesContext();

  const [selectedRig, setSelectedRig] = useState(() => {
    if (isUserAdm) {
      return "";
    }
    return user?.rig_id;
  });

  const [filters, setFilters] = useState({
    start_date: startDate.toISOString().split("T")[0],
    end_date: endDate.toISOString().split("T")[0],
    rig_id: selectedRig,
  });

  const {
    efficiencies,
    isLoading: isLoadingEfficiencies,
    refetch: refetchEfficiencies,
  } = useGetEfficiencies(filters);
  const {rigs, isLoading: isLoadingRigs} = useGetRigs();

  useEffect(() => {
    refetchEfficiencies();
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

  const handleRigChange = (event) => {
    setSelectedRig(event.target.value);
    setFilters((prevState) => ({
      ...prevState,
      rig_id: event.target.value,
    }));
  };

  const {
    totalAvailableHours,
    totalHoursPercentage,
    totalGlossHours,
    totalGlossHoursPercentage,
    totalDtmss,
    totalMovimentations,
  } = useStatBox(efficiencies, startDate, endDate);

  return (
    <DashboardContext.Provider
      value={{
        efficiencies,
        isLoading: isLoadingEfficiencies || isLoadingRigs,
        rigs,
        selectedRig,
        handleRigChange,
        totalAvailableHours,
        totalHoursPercentage,
        totalGlossHours,
        totalGlossHoursPercentage,
        totalDtmss,
        totalMovimentations,
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
    </DashboardContext.Provider>
  );
};
