export const useFormatEfficienciesArray = (efficiencies) => {
  const formatedItems = efficiencies.map((item) => {
    const dataObj = new Date(item?.date);
    dataObj.setHours(dataObj.getHours() + 12);

    const availableHours = item.available_hours;
    const dtmHours = item.dtm_hours ? item.dtm_hours : 0;

    const hasDtm = item.dtm_periods.length != 0 ? true : false;
    const hasGlossHours = item.gloss_periods.length != 0 ? true : false;
    const hasRepairHours = item.repair_periods.length != 0 ? true : false;

    return {
      ...item,
      date: dataObj,
      hasDtm,
      hasGlossHours,
      hasRepairHours,
      efficiency: parseFloat(item.efficiency),
    };
  });

  return formatedItems;
};
