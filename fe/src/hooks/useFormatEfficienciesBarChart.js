import { months } from "../utils/monthsArray";

//Hook para criar dados para o gráfico de Barras

const useFormatEfficienciesBarChart = (
  efficiencies,
  selectedMonth,
  selectedRig
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

  return data.map(({ rig, availableHours }) => {
    const fixedAvailableHours = availableHours.toFixed(2);

    if (selectedRig === rig) {
      return { rig, availableHours: fixedAvailableHours, highlight: true };
    }
    return { rig, availableHours: fixedAvailableHours };
  });
};

export default useFormatEfficienciesBarChart;
