import { months } from "../utils/monthsArray";
export const useFormatEfficienciesLineChart = (efficiencies, selectedMonth) => {
  if (efficiencies) {
    let mappedEfficiencies = [];
    efficiencies.map((efficiency) => {
      const dateObj = new Date(efficiency.date);
      dateObj.setHours(dateObj.getHours() + 12);

      const day = dateObj.getDate();
      const month = dateObj.getMonth();
      const year = dateObj.getFullYear();

      if (months[dateObj.getMonth()] === selectedMonth) {
        mappedEfficiencies.push({
          x: `${day}/${month + 1}`,
          y: efficiency.efficiency,
        });
      }
    });

    return mappedEfficiencies;
  }

  return [];
};
