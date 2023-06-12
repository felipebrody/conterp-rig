import { months } from "../utils/monthsArray";
export const useFormatEfficienciesLineChart = (
  efficiencies,
  selectedMonth,
  selectedRig
) => {
  if (efficiencies) {
    let mappedEfficiencies = [];
    efficiencies.map((efficiency) => {
      const dateObj = new Date(efficiency.date);
      dateObj.setHours(dateObj.getHours() + 12);

      const day = dateObj.getDate();
      const month = dateObj.getMonth();
      const year = dateObj.getFullYear();

      if (
        months[dateObj.getMonth()] === selectedMonth &&
        selectedRig === efficiency.rig_name
      ) {
        mappedEfficiencies.push({
          x: `${day}/${month + 1}`,
          y: efficiency.efficiency,
        });
      }
    });

    mappedEfficiencies.sort((a, b) => {
      const dayA = parseInt(a.x.split("/")[0]);
      const dayB = parseInt(b.x.split("/")[0]);

      return dayA - dayB;
    });

    return mappedEfficiencies;
  }

  return [];
};
