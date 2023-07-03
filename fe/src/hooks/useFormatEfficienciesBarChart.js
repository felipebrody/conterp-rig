import { months } from "../utils/monthsArray";

//Hook para criar dados para o gráfico de Barras

const useFormatEfficienciesBarChart = (
  efficiencies,
  selectedMonth,
  selectedRig
) => {
  let data = [];
  let invoicingTest = [];

  if (efficiencies) {
    let mappedEfficiencies = [];

    // Filrando as efficiencias pelo mês selecionado
    efficiencies.map((efficiency) => {
      const dateObj = new Date(efficiency.date);
      dateObj.setHours(dateObj.getHours() + 12);

      const day = dateObj.getDate();
      const month = dateObj.getMonth();

      if (months[dateObj.getMonth()] === selectedMonth) {
        mappedEfficiencies.push(efficiency);
      }
    });

    console.log("Efficiencies coming to Hook ==>", efficiencies);
    console.log("Mapped efficiencies", mappedEfficiencies);

    //Contando a quantidade de ocorrencias de acordo com o período selecionado (DTMS e Movimentações)

    /* DTMs */
    let dtmLessThanTwenty = 0;
    let dtmBetweenTwentyAndFifty = 0;
    let dtmGreaterThanFifty = 0;
    let totalDtms = 0;

    /* EQUIPMENT */
    let equipmentLessThanTwenty = 0;
    let equipmentBetweenTwentyAndFifty = 0;
    let equipmentGreaterThanFifty = 0;

    /* FLUID */
    let fluidLessThanTwenty = 0;
    let fluidBetweenTwentyAndFifty = 0;
    let fluidGreaterThanFifty = 0;

    //Reduce para extrair as informações acima
    invoicingTest = mappedEfficiencies.reduce((acc, efficiency, index) => {
      const rigName = efficiency.rig_name;
      const hours = parseFloat(efficiency.available_hours).toFixed(2);

      const rigNameAlreadyExists = acc.find(
        (objects) => objects.rig === rigName
      );

      if (!rigNameAlreadyExists) {
        acc.push({
          rig: rigName,
          availableHours: hours,
          dtmLessThanTwenty: 0,
          dtmBetweenTwentyAndFifty: 0,
          dtmGreaterThanFifty: 0,
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

      //Informações sobre DTM
      totalDtms += efficiency.dtm_periods.length;

      efficiency.dtm_periods.forEach(({ distance }) => {
        if (distance === "less_than_20") {
          dtmLessThanTwenty += 1;
        }

        if (distance === "between_20_and_50") {
          dtmBetweenTwentyAndFifty += 1;
        }
        if (distance === "greater_than_50") {
          dtmGreaterThanFifty += 1;
        }
      });

      //Informações sobre movimentações de Equipamentos
      efficiency.equipment_ratio.forEach(({ ratio }) => {
        if (ratio === "less_than_20") {
          equipmentLessThanTwenty += 1;
        }

        if (ratio === "between_20_and_50") {
          equipmentBetweenTwentyAndFifty += 1;
        }
        if (ratio === "greater_than_50") {
          equipmentGreaterThanFifty += 1;
        }
      });

      //Informações sobre movimentações de Equipamentos
      efficiency.fluid_ratio.forEach(({ ratio }) => {
        if (ratio === "less_than_20") {
          fluidLessThanTwenty += 1;
        }

        if (ratio === "between_20_and_50") {
          fluidBetweenTwentyAndFifty += 1;
        }
        if (ratio === "greater_than_50") {
          fluidGreaterThanFifty += 1;
        }
      });

      return acc;
    }, []);

    console.log("DTM < 20: ", dtmLessThanTwenty);
    console.log("20 < DTM <= 50: ", dtmBetweenTwentyAndFifty);
    console.log("DTM > 50: ", dtmGreaterThanFifty);
    console.log("Total de DTMs: ", totalDtms);

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
