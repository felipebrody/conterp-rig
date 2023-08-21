import {billingFormatEfficiencies} from "../../../../utils/billingFormatEfficiencies";

//Hook para criar dados para o gráfico de Barras

export const useBarChart = (efficiencies, dataType) => {
  let hoursData = [];

  if (efficiencies) {
    // Filrando as efficiencias pelo mês selecionado

    if (dataType === "hours") {
      hoursData = efficiencies.reduce((acc, efficiency, index) => {
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
          let newArray = acc.map(({rig, availableHours}) => {
            if (rig === rigName) {
              return {
                rig: rigName,
                availableHours: availableHours + hours,
              };
            }

            return {rig, availableHours};
          });

          acc = newArray;
        }

        return acc;
      }, []);

      //Retornando o array de Horas caso a informação de hora seja pedida
      const data = hoursData.map(({rig, availableHours}) => {
        const fixedAvailableHours = availableHours.toFixed(2);

        return {rig, availableHours: fixedAvailableHours};
      });

      return {data};
    }

    if (dataType === "invoicing") {
      //Inicio da logica de faturamento
      const data = billingFormatEfficiencies(efficiencies);

      const totalValue = data.reduce((acc, {totalValue}) => {
        acc += totalValue;
        return acc;
      }, 0);

      return {data, totalValue};
    }
    //Fim da lógica de faturamento
  }
};
