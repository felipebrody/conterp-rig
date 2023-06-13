import { useEffect, useState } from "react";
import { months } from "../utils/monthsArray";
import { monthsDays } from "../utils/monthsDaysArray";

export const useStatBox = (efficiencies, selectedMonth, selectedRig) => {
  console.log("Efficiencies", efficiencies);
  const [statBoxOne, setStatBoxOne] = useState({});
  const [statBoxTwo, setStatBoxTwo] = useState(0);

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
      efficiencies.map(({ available_hours, date, rig_name }) => {
        const dateObj = new Date(date);

        console.log("selected Rig", selectedRig);
        console.log("Rig Name", rig_name);
        if (
          dateObj.getUTCMonth() === months.indexOf(selectedMonth) &&
          selectedRig === rig_name
        ) {
          hoursAvailable += parseFloat(available_hours);
          glossHours += parseFloat(24 - available_hours);
          return { available_hours, date };
        }
      });

      console.log("Horas disponivel no mes selecionado ==>", hoursAvailable);

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
    }
  }, [selectedMonth, efficiencies, selectedRig]);

  return {
    statBoxOne,
    statBoxTwo,
  };
};
