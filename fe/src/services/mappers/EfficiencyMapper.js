class EfficiencyMapper {
  toPersitence(domainEfficiency) {}

  toDomain(persistenceEfficiency, hasRepairHours, hasGlossHours) {
    //const dateString = persistenceEfficiency.date.toString();
    const dateString = new Date(persistenceEfficiency.date);

    const gloss_periods = persistenceEfficiency.gloss_periods;
    const repair_periods = persistenceEfficiency.repair_periods;

    //Função para adicionar um digito caso tenha apenas um nos minutos
    const addDigit = (digits) => {
      let string = digits.toString();

      if (string.length < 2) {
        string = `0${string}`;
        return string;
      }
      return digits;
    };

    let mappedGlossPeriod = null;
    let mappedRepairPeroids = null;

    if (hasGlossHours) {
      //Mapeamento dos horarios adicionando os digitos e transformando em String
      mappedGlossPeriod = gloss_periods.map((period) => {
        const startHour = addDigit(period.start_time_gloss.$H);
        const endHour = addDigit(period.end_time_gloss.$H);
        const startMinute = addDigit(period.start_time_gloss.$m);
        const endMinute = addDigit(period.end_time_gloss.$m);

        return {
          ...period,
          start_time_gloss: `${startHour}:${startMinute}:00`,
          end_time_gloss: `${endHour}:${endMinute}:00`,
        };
      });
    }

    if (hasRepairHours) {
      mappedRepairPeroids = repair_periods.map((period) => {
        const addDigit = (digits) => {
          let string = digits.toString();

          if (string.length < 2) {
            string = `0${string}`;
            return string;
          }

          return digits;
        };

        const startHour = addDigit(period.start_time_repair.$H);
        const endHour = addDigit(period.end_time_repair.$H);
        const startMinute = addDigit(period.start_time_repair.$m);
        const endMinute = addDigit(period.end_time_repair.$m);

        return {
          ...period,
          start_time_repair: `${startHour}:${startMinute}:00`,
          end_time_repair: `${endHour}:${endMinute}:00`,
        };
      });
    }

    let toDatabase = {
      date: dateString,
      gloss_periods: mappedGlossPeriod,
      repair_periods: mappedRepairPeroids,
      equipment_ratio: persistenceEfficiency.equipment_ratio || null,
      fluid_ratio: persistenceEfficiency.fluid_ratio || null,
      dtm_distance: persistenceEfficiency.dtm_distance || null,
      available_hours: persistenceEfficiency.available_hours,
      dtm_hours: persistenceEfficiency.dtm_hours || null,
      has_repair_hours: hasRepairHours,
      has_gloss_hours: hasGlossHours,
      oil_well: persistenceEfficiency.oil_well,
    };

    return toDatabase;
  }
}

export default new EfficiencyMapper();
