import {useEffect, useState} from "react";
import {getMonthTotalHours} from "../../utils/getMonthTotalHours";

export const useStatBox = (efficiencies, startDate, endDate) => {
  const [totalAvailableHours, setTotalAvailableHours] = useState();
  const [totalHoursPercentage, setTotalHoursPercentage] = useState();
  const [totalGlossHours, setTotalGlossHours] = useState();
  const [totalGlossHoursPercentage, setTotalGlossHoursPercentage] = useState();
  const [totalDtmss, setTotalDtmss] = useState();
  const [totalMovimentations, setTotalMovimentations] = useState();

  useEffect(() => {
    if (efficiencies) {
      let hoursAvailable = 0;
      let glossHours = 0;
      let totalDtms = 0;
      let totalMovimentations = 0;

      efficiencies.map(
        ({
          available_hours,
          date,
          rig_name,
          dtm_periods,
          equipment_ratio,
          fluid_ratio,
        }) => {
          const dateObj = new Date(date);
          dateObj.setHours(dateObj.getHours() + 12);

          totalMovimentations += equipment_ratio.length + fluid_ratio.length;
          totalDtms += dtm_periods.length;
          hoursAvailable += parseFloat(available_hours);
          glossHours += parseFloat(24 - available_hours);
          return {available_hours, date};
        }
      );

      const totalHoursSelected = getMonthTotalHours(startDate, endDate);

      const efficiencyInMonth = (hoursAvailable * 100) / totalHoursSelected;
      const glossInMonth = (glossHours * 100) / totalHoursSelected;

      setTotalAvailableHours(hoursAvailable.toFixed(2));
      setTotalHoursPercentage(efficiencyInMonth.toFixed(0));
      setTotalGlossHours(glossHours.toFixed(2));
      setTotalGlossHoursPercentage(glossInMonth.toFixed(0));
      setTotalDtmss(totalDtms);
      setTotalMovimentations(totalMovimentations);
    }
  }, [efficiencies]);

  return {
    totalAvailableHours,
    totalHoursPercentage,
    totalGlossHours,
    totalGlossHoursPercentage,
    totalDtmss,
    totalMovimentations,
  };
};
