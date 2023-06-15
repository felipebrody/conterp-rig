import { useEffect, useState } from "react";
import { months } from "../utils/monthsArray";
import { monthsDays } from "../utils/monthsDaysArray";

export const useStatBox = (efficiencies, selectedMonth, selectedRig) => {
  const [statBoxOne, setStatBoxOne] = useState({});
  const [statBoxTwo, setStatBoxTwo] = useState({});
  const [statBoxThree, setStatBoxThree] = useState({});

  useEffect(() => {
    function getTotalHoursInMonth() {
      const currentDate = new Date();

      if (months.indexOf(selectedMonth) === currentDate.getMonth()) {
        const lastDayOfMonth = currentDate.getDate() - 1;
        const totalHours = lastDayOfMonth * 24;
        return totalHours;
      } else {
        const month = monthsDays.find(({ pt, en, days }) => {
          if (selectedMonth === pt) {
            return days;
          }
        });
        return month.days * 24;
      }
    }

    if (efficiencies) {
      let hoursAvailable = 0;
      let glossHours = 0;
      let totalDtms = 0;

      efficiencies.map(({ available_hours, date, rig_name, dtm_periods }) => {
        const dateObj = new Date(date);

        if (
          dateObj.getUTCMonth() === months.indexOf(selectedMonth) &&
          selectedRig === rig_name
        ) {
          totalDtms += dtm_periods.length;
          hoursAvailable += parseFloat(available_hours);
          glossHours += parseFloat(24 - available_hours);
          return { available_hours, date };
        }
      });

      const totalHoursInMonth = getTotalHoursInMonth();
      //setInforOne(totalHoursInMonth);

      const efficiencyInMonth = (hoursAvailable * 100) / totalHoursInMonth;
      const glossInMonth = (glossHours * 100) / totalHoursInMonth;

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
    }
  }, [selectedMonth, efficiencies, selectedRig]);

  return {
    statBoxOne,
    statBoxTwo,
    statBoxThree,
  };
};
