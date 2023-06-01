class EfficiencyMapper {
  toPersitence(domainEfficiency) {}

  /* toDomain(persistenceEfficiency, hasRepairHours, hasGlossHours) {
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
  } */

  toDomain(persistenceEfficiencyPeriods, date, user) {
    const toDatabase = persistenceEfficiencyPeriods.reduce(
      (acc, period, index) => {
        console.log("acc", acc);

        //Transforma as horas em minutos

        //Hora
        const startHourInMinutes =
          period.startHour.$H * 60 + period.startHour.$m;

        let endHourInMinutes = 0;

        if (period.endHour.$H === 23 && period.endHour.$m === 55) {
          endHourInMinutes = 1440;
        } else {
          endHourInMinutes = period.endHour.$H * 60 + period.endHour.$m;
        }

        console.log("period.equipmentRatio", period.equipmentRatio);

        if (period.equipmentRatio) {
          acc["equipment_ratio"].push(period.equipmentRatio);
        }

        if (period.fluidRatio) {
          acc["fluid_ratio"].push(period.fluidRatio);
        }

        acc["totalHoursInMinutes"] += endHourInMinutes - startHourInMinutes;

        //Transforma as horas em String

        //Função para adicionar um dígito na string
        const addDigit = (digits) => {
          let string = digits.toString();

          if (string.length < 2) {
            string = `0${string}`;
            return string;
          }

          return digits;
        };

        const startHour = addDigit(period.startHour.$H);
        const endHour = addDigit(period.endHour.$H);
        const startMinute = addDigit(period.startHour.$m);
        const endMinute = addDigit(period.endHour.$m);

        if (period.type === "working") {
          acc["available_hours"] +=
            (endHourInMinutes - startHourInMinutes) / 60;

          acc["working_periods"].push({
            start_time: `${startHour}:${startMinute}:00`,
            end_time: `${endHour}:${endMinute}:00`,
            description: period.description,
            oil_well_id: period.oilWell,
          });
        }

        if (period.type === "dtm") {
          acc["dtm_periods"].push({
            start_time: `${startHour}:${startMinute}:00`,
            end_time: `${endHour}:${endMinute}:00`,
            dtm_distance: period.DTMDistance,
            description: period.description,
            oil_well_id: period.oilWell,
          });

          acc["available_hours"] +=
            (endHourInMinutes - startHourInMinutes) / 60;

          acc["dtm_hours"] += (endHourInMinutes - startHourInMinutes) / 60;

          return acc;
        }

        if (period.type === "repair") {
          acc["repair_periods"].push({
            start_time: `${startHour}:${startMinute}:00`,
            end_time: `${endHour}:${endMinute}:00`,
            repair_classification: period.repairClassification,
            description: period.description,
            oil_well_id: period.oilWell,
          });

          return acc;
        }

        if (period.type === "gloss") {
          acc["gloss_periods"].push({
            start_time: `${startHour}:${startMinute}:00`,
            end_time: `${endHour}:${endMinute}:00`,
            gloss_classification: period.glossClassification,
            description: period.description,
            oil_well_id: period.oilWell,
          });

          return acc;
        }

        return acc;
      },
      {
        working_periods: [],
        gloss_periods: [],
        repair_periods: [],
        dtm_periods: [],
        equipment_ratio: [],
        fluid_ratio: [],
        available_hours: 0,
        dtm_hours: 0,

        totalHoursInMinutes: 0,
      }
    );

    return { ...toDatabase, date: date, user_id: user.id, rig_id: user.rig_id };
  }
}

export default new EfficiencyMapper();
