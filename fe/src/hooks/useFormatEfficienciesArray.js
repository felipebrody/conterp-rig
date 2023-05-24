export const useFormatEfficienciesArray = (efficiencies) => {
  const formatedItems = efficiencies.map((item) => {
    const dataObj = new Date(item?.date);
    dataObj.setHours(dataObj.getHours() + 12);

    const availableHours = item.available_hours;
    const dtmHours = item.dtm_hours ? item.dtm_hours : 0;

    const hasDtm = item.dtm_hours ? true : false;
    const hasGlossHours = item.gloss_detail_id ? true : false;
    const hasRepairHours = item.repair_detail_id ? true : false;

    console.log("availableHours", typeof availableHours);
    console.log("dtmHours", typeof dtmHours);

    const efficiency =
      (parseFloat(availableHours) + parseFloat(dtmHours)) / 24.0;

    return {
      ...item,
      date: dataObj,
      hasDtm,
      hasGlossHours,
      hasRepairHours,
      efficiency: efficiency.toFixed(2) * 100,
    };
  });

  return formatedItems;
};
