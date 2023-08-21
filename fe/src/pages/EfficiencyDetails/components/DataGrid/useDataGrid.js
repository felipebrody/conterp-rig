import {
  distanceClassification,
  glossClassification,
  repairClassification,
} from "../../../../utils/glossClassifications";

export const useDataGrid = (efficiency) => {
  let allPeriods = [];

  if (efficiency?.length === 0) {
    return {allPeriods};
  }

  // Função para adicionar períodos ao array
  const addPeriodsToArray = (periods, type) => {
    //Função para traduzir as classificações
    const translate = (type, text) => {
      let name = null;

      if (type === "repair") {
        const res = repairClassification.find(({name, value}) => {
          if (value === text) {
            return name;
          }
          return null;
        });

        name = res.name;
      }

      if (type === "gloss") {
        const res = glossClassification.find(({name, value}) => {
          if (value === text) {
            return name;
          }
          return null;
        });

        name = res.name;
      }

      if (type === "DTM") {
        const res = distanceClassification.find(({name, value}) => {
          if (value === text) {
            return name;
          }

          return null;
        });

        name = res.name;
      }

      return name;
    };
    //Fim da tradução

    //Função para mudar o horário de 23:55 para 23:59
    const changeEndHour = (hour) => {
      return hour === "23:55" ? "23:59" : hour;
    };
    periods.forEach((period) => {
      let formattedPeriod = null;
      if (type === "repair") {
        formattedPeriod = {
          id: period.id,
          start_hour: period.start_hour.slice(0, 5),
          end_hour: changeEndHour(period.end_hour.slice(0, 5)),
          description: period.description,
          classification: translate(type, period.classification),
          oil_well_name: period.oil_well_name,
          type: "Reparo",
        };
      }

      if (type === "gloss") {
        formattedPeriod = {
          id: period.id,
          start_hour: period.start_hour.slice(0, 5),
          end_hour: changeEndHour(period.end_hour.slice(0, 5)),
          description: period.description,
          classification: translate(type, period.type),
          oil_well_name: period.oil_well_name,
          type: "Glosa",
        };
      }

      if (type === "working") {
        formattedPeriod = {
          id: period.id,
          start_hour: period.start_hour.slice(0, 5),
          end_hour: changeEndHour(period.end_hour.slice(0, 5)),
          description: period.description,
          oil_well_name: period.oil_well_name,
          type: "Operando",
        };
      }

      if (type === "DTM") {
        formattedPeriod = {
          id: period.id,
          start_hour: period.start_hour.slice(0, 5),
          end_hour: changeEndHour(period.end_hour.slice(0, 5)),
          description: period.description,
          classification: translate(type, period.distance),
          oil_well_name: period.oil_well_name,
          type: "DTM",
        };
      }
      allPeriods.push(formattedPeriod);
    });
  };

  // Adicionando os períodos de cada tipo ao array
  if (efficiency) {
    addPeriodsToArray(efficiency.gloss_periods, "gloss");
    addPeriodsToArray(efficiency.repair_periods, "repair");
    addPeriodsToArray(efficiency.operating_periods, "working");
    addPeriodsToArray(efficiency.dtm_periods, "DTM");
  }
  return {allPeriods};
};
