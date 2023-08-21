export const useFormatEfficienciesLineChart = (efficiencies) => {
  if (efficiencies) {
    let mappedEfficiencies = [];
    efficiencies.map((efficiency) => {
      const dateObj = new Date(efficiency.date);
      dateObj.setHours(dateObj.getHours() + 3);

      const day = dateObj.getDate();
      const month = dateObj.getMonth();

      mappedEfficiencies.push({
        id: efficiency.efficiency_id,
        x: `${day}/${month + 1}`,
        y: efficiency.efficiency,
      });
    });

    mappedEfficiencies.sort((a, b) => {
      const [dayA, monthA] = a.x.split("/").map(Number);
      const [dayB, monthB] = b.x.split("/").map(Number);

      if (monthA !== monthB) {
        return monthA - monthB; // Ordenar por mês primeiro
      }

      return dayA - dayB; // Em caso de empate no mês, ordenar por dia
    });

    return mappedEfficiencies;
  }

  return [];
};
