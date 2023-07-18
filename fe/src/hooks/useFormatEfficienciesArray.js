import { months } from "../utils/monthsArray";
export const useFormatEfficienciesArray = (
  efficiencies,
  startDate,
  endDate
) => {
  let mappedEfficiencies = [];

  const formatedItems = efficiencies.map((item) => {
    const dateObj = new Date(item?.date);
    dateObj.setHours(dateObj.getHours() + 12);

    if (dateObj >= startDate && dateObj <= endDate) {
      const availableHours = item.available_hours;
      const dtmHours = item.dtm_hours ? item.dtm_hours : 0;

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

  return mappedEfficiencies;
};
