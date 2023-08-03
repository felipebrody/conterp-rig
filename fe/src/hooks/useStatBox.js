import {useEffect, useState} from "react";
import {months} from "../utils/monthsArray";
import {monthsDays} from "../utils/monthsDaysArray";
import {getMonthTotalHours} from "../utils/getMonthTotalHours";

export const useStatBox = (
  efficiencies,
  selectedMonth,
  selectedRig,
  startDate,
  endDate
) => {
  const [statBoxOne, setStatBoxOne] = useState({});
  const [statBoxTwo, setStatBoxTwo] = useState({});
  const [statBoxThree, setStatBoxThree] = useState({});
  const [statBoxFour, setStatBoxFour] = useState({});

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

          if (
            dateObj >= startDate &&
            dateObj <= endDate &&
            selectedRig === rig_name
          ) {
            console.log(equipment_ratio.length);
            totalMovimentations += equipment_ratio.length + fluid_ratio.length;
            totalDtms += dtm_periods.length;
            hoursAvailable += parseFloat(available_hours);
            glossHours += parseFloat(24 - available_hours);
            return {available_hours, date};
          }
        }
      );

      const totalHoursSelected = getMonthTotalHours(startDate, endDate);
      //setInforOne(totalHoursSelected);

      const efficiencyInMonth = (hoursAvailable * 100) / totalHoursSelected;
      const glossInMonth = (glossHours * 100) / totalHoursSelected;

      setStatBoxOne({
        percentage: efficiencyInMonth.toFixed(0),
        hours: hoursAvailable.toFixed(2),
      });
      setStatBoxTwo({
        percentage: glossInMonth.toFixed(0),
        hours: glossHours.toFixed(2),
      });
      setStatBoxThree({
        totalDtms: totalDtms,
      });

      setStatBoxFour({
        totalMovimentations: totalMovimentations,
      });
    }
  }, [selectedMonth, efficiencies, selectedRig, startDate, endDate]);

  return {
    statBoxOne,
    statBoxTwo,
    statBoxThree,
    statBoxFour,
  };
};
