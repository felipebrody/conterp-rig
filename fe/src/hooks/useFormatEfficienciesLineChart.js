export const useFormatEfficienciesLineChart = (efficiencies) => {
  if (efficiencies) {
    console.log("from hook Efficiences", efficiencies);
    const mappedEfficiencies = efficiencies.map((efficiency) => {
      const dateObj = new Date(efficiency.date);
      dateObj.setHours(dateObj.getHours() + 12);
      console.log("Object Date in Hook", dateObj.getMonth());

      const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];

      const day = dateObj.getDate();
      const month = dateObj.getMonth();
      const year = dateObj.getFullYear();

      //return `${day} de ${month} ${year}`;
      return {
        x: `${day}/${month}`,
        y: efficiency.efficiency,
      };
    });

    return mappedEfficiencies;
  }

  return [];
};
