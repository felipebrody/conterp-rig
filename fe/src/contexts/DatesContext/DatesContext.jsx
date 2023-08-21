import {createContext, useState} from "react";

export const DatesContext = createContext({});

export const DatesProvider = ({children}) => {
  const currentDate = new Date();

  const [startDate, setStartDate] = useState(
    new Date(`2023-${currentDate.getUTCMonth() + 1}-01`)
  );
  const [endDate, setEndDate] = useState(
    new Date(`2023-${currentDate.getUTCMonth() + 1}-30`)
  );

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  return (
    <DatesContext.Provider
      value={{
        startDate,
        handleStartDateChange,
        handleEndDateChange,
        endDate,
        currentDate,
      }}
    >
      {children}
    </DatesContext.Provider>
  );
};
