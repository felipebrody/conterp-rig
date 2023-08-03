import {months} from "../utils/monthsArray";
export const useFormatEfficienciesArray = (
  efficiencies,
  selectedRig,
  startDate,
  endDate
) => {
  let mappedEfficiencies = [];

  efficiencies.map((item) => {
    const dateObj = new Date(item?.date);
    dateObj.setHours(dateObj.getHours() + 3);
    if (
      dateObj >= startDate &&
      dateObj <= endDate &&
      selectedRig === item.rig_name
    ) {
      const hasDtm = item.dtm_periods.length != 0 ? true : false;
      const hasGlossHours = item.gloss_periods.length != 0 ? true : false;
      const hasRepairHours = item.repair_periods.length != 0 ? true : false;
      const day = dateObj.getDate();
      const month = months[dateObj.getMonth()];
      const year = dateObj.getFullYear();
      const dateString = `${day} de ${month} ${year}`;

      mappedEfficiencies.push({
        ...item,
        date: dateObj,
        dateString,
        hasDtm,
        hasGlossHours,
        hasRepairHours,
        efficiency: parseFloat(item.efficiency),
      });
    }
  });

  return mappedEfficiencies.reverse();
};
