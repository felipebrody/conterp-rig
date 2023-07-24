import { billingFormatEfficiencies } from "../utils/billingFormatEfficiencies";
import { months } from "../utils/monthsArray";

//Hook para criar dados para o gráfico de Barras

const useFormatEfficienciesBarChart = (
  efficiencies,
  selectedMonth,
  selectedRig,
  startDate,
  endDate,
  dataType
) => {
  let hoursData = [];
  let mappedEfficiencies = [];

  if (efficiencies) {
    // Filrando as efficiencias pelo mês selecionado
    efficiencies.map((efficiency) => {
      const dateObj = new Date(efficiency.date);

      dateObj.setHours(dateObj.getHours() + 3);

      if (months[dateObj.getMonth()] === selectedMonth) {
        // mappedEfficiencies.push(efficiency);
      }

      if (dateObj >= startDate && dateObj <= endDate) {
        mappedEfficiencies.push(efficiency);
      }
    });

    if (dataType === "hours") {
      hoursData = mappedEfficiencies.reduce((acc, efficiency, index) => {
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

      //Retornando o array de Horas caso a informação de hora seja pedida
      const data = hoursData.map(({ rig, availableHours }) => {
        const fixedAvailableHours = availableHours.toFixed(2);

        if (selectedRig === rig) {
          return { rig, availableHours: fixedAvailableHours, highlight: true };
        }

        return { rig, availableHours: fixedAvailableHours };
      });

      return { data };
    }

    if (dataType === "invoicing") {
      //Inicio da logica de faturamento
      const data = billingFormatEfficiencies(mappedEfficiencies);

      const totalValue = data.reduce((acc, { totalValue }) => {
        acc += totalValue;
        return acc;
      }, 0);

      return { data, totalValue };
    }
    //Fim da lógica de faturamento
  }
};

export default useFormatEfficienciesBarChart;
