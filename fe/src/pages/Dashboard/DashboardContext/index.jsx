//React
import {createContext, useState, useEffect, useCallback} from "react";

//Hooks
import {useGetEfficiencies} from "../../../hooks/useGetEfficiencies";
import {useGetRigs} from "../../../hooks/useGetRigs";
import {useDatesContext} from "../../../contexts/DatesContext";

//Redux
import {useSelector} from "react-redux";

//Components
import {useStatBox} from "../../../components/StatBox/useStateBox";

export const DashboardContext = createContext({});

export const DashboardProvider = ({children}) => {
  const user = useSelector((state) => state.user);
  const {
    startDate,
    handleStartDateChange,
    handleEndDateChange,
    endDate,
    currentDate,
  } = useDatesContext();

  const {rigs, isLoading: isLoadingRigs} = useGetRigs();

  const [selectedRig, setSelectedRig] = useState(() => {
    return user?.rig_id ? user?.rig_id : rigs[0]?.id;
  });

  const [filters, setFilters] = useState({
    start_date: startDate.toISOString().split("T")[0],
    end_date: endDate.toISOString().split("T")[0],
    rig_id: selectedRig,
  });

  const {
    efficiencies,
    isFetching,
    isLoading: isLoadingEfficiencies,
    refetch: refetchEfficiencies,
  } = useGetEfficiencies(filters);

  useEffect(() => {
    refetchEfficiencies();
  }, [filters, refetchEfficiencies]);

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
        isLoading: isLoadingEfficiencies || isLoadingRigs || isFetching,
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
