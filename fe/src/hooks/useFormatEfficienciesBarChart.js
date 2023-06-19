import { months } from "../utils/monthsArray";

const useFormatEfficienciesBarChart = (
  efficiencies,
  selectedMonth = "Junho"
) => {
  let data = [];
  if (efficiencies) {
    let mappedEfficiencies = [];

    efficiencies.map((efficiency) => {
      const dateObj = new Date(efficiency.date);
      dateObj.setHours(dateObj.getHours() + 12);

      const day = dateObj.getDate();
      const month = dateObj.getMonth();

      if (months[dateObj.getMonth()] === selectedMonth) {
        mappedEfficiencies.push(efficiency);
      }
    });

    console.log("MappedEfficiencies", mappedEfficiencies);

    data = mappedEfficiencies.reduce((acc, efficiency, index) => {
      const rigName = efficiency.rig_name;
      const hours = parseFloat(efficiency.available_hours);

      const rigNameAlreadyExists = acc.find(
        (objects) => objects.rig === rigName
      );

      if (!rigNameAlreadyExists) {
        acc.push({
          rig: rigName,
          availableHours: hours,
        });
      } else {
        let newArray = acc.map(({ rig, availableHours }) => {
          if (rig === rigName) {
            return {
              rig: rigName,
              availableHours: availableHours + hours,
            };
          }

          return { rig, availableHours };
        });

        acc = newArray;
      }

      return acc;
    }, []);
  }

  return data;
};

export default useFormatEfficienciesBarChart;
