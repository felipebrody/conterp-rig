import { billingFormatEfficiencies } from "../utils/billingFormatEfficiencies";
import { months } from "../utils/monthsArray";

//Hook para criar dados para o gráfico de Barras

export const useBillingDataGrid = (
  efficiencies,

  startDate,
  endDate
) => {
  let mappedEfficiencies = [];

  if (efficiencies) {
    // Filrando as efficiencias pelo mês selecionado
    efficiencies.map((efficiency) => {
      const dateObj = new Date(efficiency.date);
      dateObj.setHours(dateObj.getHours() + 12);

      if (dateObj >= startDate && dateObj <= endDate) {
        mappedEfficiencies.push(efficiency);
      }
    });

    return billingFormatEfficiencies(mappedEfficiencies);
  }
};
export default useBillingDataGrid;
