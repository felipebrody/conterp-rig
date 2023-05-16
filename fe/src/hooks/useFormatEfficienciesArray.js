export const useFormatEfficienciesArray = (efficiencies) => {
  const formatedItems = efficiencies.map((item) => {
    const dataObj = new Date(item?.date);
    dataObj.setHours(dataObj.getHours() + 12);

    const availableHours = item.available_hours;
    const dtmHours = item.dtmHours ? item.dtmHours : 0;

    const efficiency = (availableHours + dtmHours) / 24;

    return { ...item, date: dataObj, efficiency: efficiency.toFixed(2) * 100 };
  });

  return formatedItems;
};
