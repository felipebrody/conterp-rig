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

    //Reduce para extrair as informações acima
    invoicingTest = mappedEfficiencies.reduce((acc, efficiency, index) => {
      const rigName = efficiency.rig_name;
      const hours = parseFloat(efficiency.available_hours).toFixed(2);

      const rigNameAlreadyExists = acc.find(
        (objects) => objects.rig === rigName
      );

      let existingIndex = null;

      if (!rigNameAlreadyExists) {
        acc.push({
          rig: rigName,
          availableHours: hours,
          dtm_periods: efficiency.dtm_periods,
          equipment_ratio: efficiency.equipment_ratio,
          fluid_ratio: efficiency.fluid_ratio,
          operating_periods: efficiency.operating_periods,
          dtmLessThanTwenty: 0,
          dtmBetweenTwentyAndFifty: 0,
          dtmGreaterThanFifty: 0,
          equipmentLessThanTwenty: 0,
          equipmentBetweenTwentyAndFifty: 0,
          equipmentGreaterThanFift: 0,
          fluidLessThanTwenty: 0,
          fluidBetweenTwentyAndFifty: 0,
          fluidGreaterThanFifty: 0,
        });
      } else {
        existingIndex = acc.findIndex((object) => object.rig === rigName);

        acc[existingIndex].dtm_periods = acc[existingIndex].dtm_periods.concat(
          efficiency.dtm_periods
        );
        acc[existingIndex].equipment_ratio = acc[
          existingIndex
        ].equipment_ratio.concat(efficiency.equipment_ratio);
        acc[existingIndex].fluid_ratio = acc[existingIndex].fluid_ratio.concat(
          efficiency.fluid_ratio
        );
        acc[existingIndex].operating_periods = acc[
          existingIndex
        ].operating_periods.concat(efficiency.operating_periods);
      }
      /* console.log("Objeto sendo iterado:", efficiency);
      console.log(`Accumulator na interação ${index}: `);
      console.log(acc); */

      /* Código Recortado */

      //Informações sobre DTM
      /* totalDtms += efficiency.dtm_periods.length;

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
      }); */

      return acc;
    }, []);

    //************************************************************************/

    const test = JSON.stringify(invoicingTest);
    console.log("Reduce result =>", invoicingTest);

    const dtmLessThanTwentyCount = {};
    const dtmBetweenTwentyAndFiftyCount = {};
    const dtmGreaterThanFiftyCount = {};

    invoicingTest.forEach((item) => {
      const rigName = item.rig;
      console.log("Item Pai: ", item);

      // Contagem de DTMs abaixo de 20
      item.dtm_periods.forEach(({ distance }) => {
        if (distance === "less_than_20") {
          item.dtmLessThanTwenty++;
        }

        if (distance === "between_20_and_50") {
          item.dtmBetweenTwentyAndFifty++;
        }

        if (distance === "greater_than_50") {
          item.dtmGreaterThanFifty++;
        }
      });
    });

    console.log("After For Each =>", invoicingTest);

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
