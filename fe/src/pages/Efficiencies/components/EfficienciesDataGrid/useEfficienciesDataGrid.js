import {months} from "../../../../utils/monthsArray";

export const useEfficienciesDataGrid = (efficiencies) => {
  if (!efficiencies) return [];
  const formattedEfficiencies = efficiencies.map((efficiency) => {
    const dateObj = new Date(efficiency?.date);
    dateObj.setHours(dateObj.getHours() + 3);
    const hasDtm = efficiency.dtm_periods.length != 0 ? true : false;
    const hasGlossHours = efficiency.gloss_periods.length != 0 ? true : false;
    const hasRepairHours = efficiency.repair_periods.length != 0 ? true : false;
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    const dateString = `${day} de ${month} ${year}`;

    return {
      ...efficiency,
      date: dateObj,
      dateString,
      hasDtm,
      hasGlossHours,
      hasRepairHours,
      efficiency: parseFloat(efficiency.efficiency),
    };
  });

  return formattedEfficiencies;
};
