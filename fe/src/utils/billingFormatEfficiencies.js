export const billingFormatEfficiencies = (efficiencies) => {
  let invoicingTest = efficiencies.reduce((acc, efficiency, index) => {
    const rigName = efficiency.rig_name;
    const hours = parseFloat(efficiency.available_hours);

    const rigNameAlreadyExists = acc.find((objects) => objects.rig === rigName);

    let existingIndex = null;

    //Agrupando os periodos por sonda
    if (!rigNameAlreadyExists) {
      acc.push({
        rig: rigName,
        availableHours: hours,
        dtm_periods: efficiency.dtm_periods,
        equipment_ratio: efficiency.equipment_ratio,
        fluid_ratio: efficiency.fluid_ratio,
        operating_periods: efficiency.operating_periods,
        dtmLessThanTwenty: 0,
        dtmBetweenTwentyAndFifty: 0,
        dtmGreaterThanFifty: 0,
        equipmentLessThanTwenty: 0,
        equipmentBetweenTwentyAndFifty: 0,
        equipmentGreaterThanFifty: 0,
        fluidLessThanTwenty: 0,
        fluidBetweenTwentyAndFifty: 0,
        fluidGreaterThanFifty: 0,
      });
    } else {
      existingIndex = acc.findIndex((object) => object.rig === rigName);

      acc[existingIndex].availableHours += hours;

      acc[existingIndex].dtm_periods = acc[existingIndex].dtm_periods.concat(
        efficiency.dtm_periods
      );
      acc[existingIndex].equipment_ratio = acc[
        existingIndex
      ].equipment_ratio.concat(efficiency.equipment_ratio);
      acc[existingIndex].fluid_ratio = acc[existingIndex].fluid_ratio.concat(
        efficiency.fluid_ratio
      );
      acc[existingIndex].operating_periods = acc[
        existingIndex
      ].operating_periods.concat(efficiency.operating_periods);
    }
    return acc;
  }, []);

  //************************************************************************/

  //Contando os tipos de periodo
  invoicingTest.forEach((item) => {
    item.dtm_periods.forEach(({ distance }) => {
      if (distance === "less_than_20") {
        item.dtmLessThanTwenty++;
      }

      if (distance === "between_20_and_50") {
        item.dtmBetweenTwentyAndFifty++;
      }

      if (distance === "greater_than_50") {
        item.dtmGreaterThanFifty++;
      }
    });

    item.equipment_ratio.forEach(({ ratio }) => {
      if (ratio === "less_than_20") {
        item.equipmentLessThanTwenty++;
      }

      if (ratio === "between_20_and_50") {
        item.equipmentBetweenTwentyAndFifty++;
      }

      if (ratio === "greater_than_50") {
        item.equipmentGreaterThanFifty++;
      }
    });

    item.fluid_ratio.forEach(({ ratio }) => {
      if (ratio === "less_than_20") {
        item.fluidLessThanTwenty++;
      }

      if (ratio === "between_20_and_50") {
        item.fluidBetweenTwentyAndFifty++;
      }

      if (ratio === "greater_than_50") {
        item.fluidGreaterThanFifty++;
      }
    });
  });

  const mappedInvoices = invoicingTest.map((efficiency) => {
    if (efficiency.rig === "SPT 111") {
      const availableHoursBilling = efficiency.availableHours * 919;
      const dtmLessThanTwentyBilling = efficiency.dtmLessThanTwenty * 5514;
      const dtmBetweenTwentyAndFiftyBilling =
        efficiency.dtmBetweenTwentyAndFifty * 7024;
      const equipmentLessThanTwentyBilling =
        efficiency.equipmentLessThanTwenty * 1756;
      const equipmentBetweenTwentyAndFiftyBilling =
        efficiency.equipmentBetweenTwentyAndFifty * 2634;
      const equipmentGreaterThanFiftyBilling =
        efficiency.equipmentGreaterThanFifty * 4390;
      const fluidLessThanTwentyBilling = efficiency.fluidLessThanTwenty * 2195;
      const fluidBetweenTwentyAndFiftyBilling =
        efficiency.fluidBetweenTwentyAndFifty * 3512;
      const fluidGreaterThanFiftyBilling =
        efficiency.fluidGreaterThanFifty * 3947;
      const readjustment = 1.5991;

      const totalValue =
        (availableHoursBilling +
          dtmLessThanTwentyBilling +
          dtmBetweenTwentyAndFiftyBilling +
          equipmentLessThanTwentyBilling +
          equipmentBetweenTwentyAndFiftyBilling +
          equipmentGreaterThanFiftyBilling +
          fluidLessThanTwentyBilling +
          fluidBetweenTwentyAndFiftyBilling +
          fluidGreaterThanFiftyBilling) *
        readjustment;

      return {
        rig: efficiency.rig,
        totalValue: parseFloat(totalValue.toFixed(2)),
        availableHoursBilling: availableHoursBilling,
        dtmLessThanTwentyBilling: dtmLessThanTwentyBilling,
        dtmBetweenTwentyAndFiftyBilling: dtmBetweenTwentyAndFiftyBilling,
        equipmentLessThanTwentyBilling: equipmentLessThanTwentyBilling,
        equipmentBetweenTwentyAndFiftyBilling:
          equipmentBetweenTwentyAndFiftyBilling,
        equipmentGreaterThanFiftyBilling: equipmentGreaterThanFiftyBilling,
        fluidLessThanTwentyBilling: fluidLessThanTwentyBilling,
        fluidBetweenTwentyAndFiftyBilling: fluidBetweenTwentyAndFiftyBilling,
        fluidGreaterThanFiftyBilling: fluidGreaterThanFiftyBilling,
      };
    }

    if (efficiency.rig === "SPT 54") {
      const availableHoursBilling = efficiency.availableHours * 919;
      const dtmLessThanTwentyBilling = efficiency.dtmLessThanTwenty * 5514;
      const dtmBetweenTwentyAndFiftyBilling =
        efficiency.dtmBetweenTwentyAndFifty * 7024;
      const equipmentLessThanTwentyBilling =
        efficiency.equipmentLessThanTwenty * 1756;
      const equipmentBetweenTwentyAndFiftyBilling =
        efficiency.equipmentBetweenTwentyAndFifty * 2634;
      const equipmentGreaterThanFiftyBilling =
        efficiency.equipmentGreaterThanFifty * 4390;
      const fluidLessThanTwentyBilling = efficiency.fluidLessThanTwenty * 2195;
      const fluidBetweenTwentyAndFiftyBilling =
        efficiency.fluidBetweenTwentyAndFifty * 3512;
      const fluidGreaterThanFiftyBilling =
        efficiency.fluidGreaterThanFifty * 3947;
      const readjustment = 1.5991;

      const totalValue =
        (availableHoursBilling +
          dtmLessThanTwentyBilling +
          dtmBetweenTwentyAndFiftyBilling +
          equipmentLessThanTwentyBilling +
          equipmentBetweenTwentyAndFiftyBilling +
          equipmentGreaterThanFiftyBilling +
          fluidLessThanTwentyBilling +
          fluidBetweenTwentyAndFiftyBilling +
          fluidGreaterThanFiftyBilling) *
        readjustment;

      return {
        rig: efficiency.rig,
        totalValue: parseFloat(totalValue.toFixed(2)),
        availableHoursBilling: availableHoursBilling,
        dtmLessThanTwentyBilling: dtmLessThanTwentyBilling,
        dtmBetweenTwentyAndFiftyBilling: dtmBetweenTwentyAndFiftyBilling,
        equipmentLessThanTwentyBilling: equipmentLessThanTwentyBilling,
        equipmentBetweenTwentyAndFiftyBilling:
          equipmentBetweenTwentyAndFiftyBilling,
        equipmentGreaterThanFiftyBilling: equipmentGreaterThanFiftyBilling,
        fluidLessThanTwentyBilling: fluidLessThanTwentyBilling,
        fluidBetweenTwentyAndFiftyBilling: fluidBetweenTwentyAndFiftyBilling,
        fluidGreaterThanFiftyBilling: fluidGreaterThanFiftyBilling,
      };
    }

    if (efficiency.rig === "SPT 88") {
      const availableHoursBilling = efficiency.availableHours * 919;
      const dtmLessThanTwentyBilling = efficiency.dtmLessThanTwenty * 5514;
      const dtmBetweenTwentyAndFiftyBilling =
        efficiency.dtmBetweenTwentyAndFifty * 7024;
      const equipmentLessThanTwentyBilling =
        efficiency.equipmentLessThanTwenty * 1756;
      const equipmentBetweenTwentyAndFiftyBilling =
        efficiency.equipmentBetweenTwentyAndFifty * 2634;
      const equipmentGreaterThanFiftyBilling =
        efficiency.equipmentGreaterThanFifty * 4390;
      const fluidLessThanTwentyBilling = efficiency.fluidLessThanTwenty * 2195;
      const fluidBetweenTwentyAndFiftyBilling =
        efficiency.fluidBetweenTwentyAndFifty * 3512;
      const fluidGreaterThanFiftyBilling =
        efficiency.fluidGreaterThanFifty * 3947;
      const readjustment = 1.5991;

      const totalValue =
        (availableHoursBilling +
          dtmLessThanTwentyBilling +
          dtmBetweenTwentyAndFiftyBilling +
          equipmentLessThanTwentyBilling +
          equipmentBetweenTwentyAndFiftyBilling +
          equipmentGreaterThanFiftyBilling +
          fluidLessThanTwentyBilling +
          fluidBetweenTwentyAndFiftyBilling +
          fluidGreaterThanFiftyBilling) *
        readjustment;

      return {
        rig: efficiency.rig,
        totalValue: parseFloat(totalValue.toFixed(2)),
        availableHoursBilling: availableHoursBilling,
        dtmLessThanTwentyBilling: dtmLessThanTwentyBilling,
        dtmBetweenTwentyAndFiftyBilling: dtmBetweenTwentyAndFiftyBilling,
        equipmentLessThanTwentyBilling: equipmentLessThanTwentyBilling,
        equipmentBetweenTwentyAndFiftyBilling:
          equipmentBetweenTwentyAndFiftyBilling,
        equipmentGreaterThanFiftyBilling: equipmentGreaterThanFiftyBilling,
        fluidLessThanTwentyBilling: fluidLessThanTwentyBilling,
        fluidBetweenTwentyAndFiftyBilling: fluidBetweenTwentyAndFiftyBilling,
        fluidGreaterThanFiftyBilling: fluidGreaterThanFiftyBilling,
      };
    }

    if (efficiency.rig === "SPT 76") {
      const availableHoursBilling = efficiency.availableHours * 919;
      const dtmLessThanTwentyBilling = efficiency.dtmLessThanTwenty * 5514;
      const dtmBetweenTwentyAndFiftyBilling =
        efficiency.dtmBetweenTwentyAndFifty * 7024;
      const equipmentLessThanTwentyBilling =
        efficiency.equipmentLessThanTwenty * 1756;
      const equipmentBetweenTwentyAndFiftyBilling =
        efficiency.equipmentBetweenTwentyAndFifty * 2634;
      const equipmentGreaterThanFiftyBilling =
        efficiency.equipmentGreaterThanFifty * 4390;
      const fluidLessThanTwentyBilling = efficiency.fluidLessThanTwenty * 2195;
      const fluidBetweenTwentyAndFiftyBilling =
        efficiency.fluidBetweenTwentyAndFifty * 3512;
      const fluidGreaterThanFiftyBilling =
        efficiency.fluidGreaterThanFifty * 3947;
      const readjustment = 1.5991;

      const totalValue =
        (availableHoursBilling +
          dtmLessThanTwentyBilling +
          dtmBetweenTwentyAndFiftyBilling +
          equipmentLessThanTwentyBilling +
          equipmentBetweenTwentyAndFiftyBilling +
          equipmentGreaterThanFiftyBilling +
          fluidLessThanTwentyBilling +
          fluidBetweenTwentyAndFiftyBilling +
          fluidGreaterThanFiftyBilling) *
        readjustment;

      return {
        rig: efficiency.rig,
        totalValue: parseFloat(totalValue.toFixed(2)),
        availableHoursBilling: availableHoursBilling,
        dtmLessThanTwentyBilling: dtmLessThanTwentyBilling,
        dtmBetweenTwentyAndFiftyBilling: dtmBetweenTwentyAndFiftyBilling,
        equipmentLessThanTwentyBilling: equipmentLessThanTwentyBilling,
        equipmentBetweenTwentyAndFiftyBilling:
          equipmentBetweenTwentyAndFiftyBilling,
        equipmentGreaterThanFiftyBilling: equipmentGreaterThanFiftyBilling,
        fluidLessThanTwentyBilling: fluidLessThanTwentyBilling,
        fluidBetweenTwentyAndFiftyBilling: fluidBetweenTwentyAndFiftyBilling,
        fluidGreaterThanFiftyBilling: fluidGreaterThanFiftyBilling,
      };
    }

    if (efficiency.rig === "SPT 151") {
      const availableHoursBilling = efficiency.availableHours * 919;
      const dtmLessThanTwentyBilling = efficiency.dtmLessThanTwenty * 5514;
      const dtmBetweenTwentyAndFiftyBilling =
        efficiency.dtmBetweenTwentyAndFifty * 7024;
      const equipmentLessThanTwentyBilling =
        efficiency.equipmentLessThanTwenty * 1756;
      const equipmentBetweenTwentyAndFiftyBilling =
        efficiency.equipmentBetweenTwentyAndFifty * 2634;
      const equipmentGreaterThanFiftyBilling =
        efficiency.equipmentGreaterThanFifty * 4390;
      const fluidLessThanTwentyBilling = efficiency.fluidLessThanTwenty * 2195;
      const fluidBetweenTwentyAndFiftyBilling =
        efficiency.fluidBetweenTwentyAndFifty * 3512;
      const fluidGreaterThanFiftyBilling =
        efficiency.fluidGreaterThanFifty * 3947;
      const readjustment = 1.5991;

      const totalValue =
        (availableHoursBilling +
          dtmLessThanTwentyBilling +
          dtmBetweenTwentyAndFiftyBilling +
          equipmentLessThanTwentyBilling +
          equipmentBetweenTwentyAndFiftyBilling +
          equipmentGreaterThanFiftyBilling +
          fluidLessThanTwentyBilling +
          fluidBetweenTwentyAndFiftyBilling +
          fluidGreaterThanFiftyBilling) *
        readjustment;

      return {
        rig: efficiency.rig,
        totalValue: parseFloat(totalValue.toFixed(2)),
        availableHoursBilling: availableHoursBilling,
        dtmLessThanTwentyBilling: dtmLessThanTwentyBilling,
        dtmBetweenTwentyAndFiftyBilling: dtmBetweenTwentyAndFiftyBilling,
        equipmentLessThanTwentyBilling: equipmentLessThanTwentyBilling,
        equipmentBetweenTwentyAndFiftyBilling:
          equipmentBetweenTwentyAndFiftyBilling,
        equipmentGreaterThanFiftyBilling: equipmentGreaterThanFiftyBilling,
        fluidLessThanTwentyBilling: fluidLessThanTwentyBilling,
        fluidBetweenTwentyAndFiftyBilling: fluidBetweenTwentyAndFiftyBilling,
        fluidGreaterThanFiftyBilling: fluidGreaterThanFiftyBilling,
      };
    }

    if (efficiency.rig === "SPT 61") {
      const availableHoursBilling = efficiency.availableHours * 919;
      const dtmLessThanTwentyBilling = efficiency.dtmLessThanTwenty * 5514;
      const dtmBetweenTwentyAndFiftyBilling =
        efficiency.dtmBetweenTwentyAndFifty * 7024;
      const equipmentLessThanTwentyBilling =
        efficiency.equipmentLessThanTwenty * 1756;
      const equipmentBetweenTwentyAndFiftyBilling =
        efficiency.equipmentBetweenTwentyAndFifty * 2634;
      const equipmentGreaterThanFiftyBilling =
        efficiency.equipmentGreaterThanFifty * 4390;
      const fluidLessThanTwentyBilling = efficiency.fluidLessThanTwenty * 2195;
      const fluidBetweenTwentyAndFiftyBilling =
        efficiency.fluidBetweenTwentyAndFifty * 3512;
      const fluidGreaterThanFiftyBilling =
        efficiency.fluidGreaterThanFifty * 3947;
      const readjustment = 1.5991;

      const totalValue =
        (availableHoursBilling +
          dtmLessThanTwentyBilling +
          dtmBetweenTwentyAndFiftyBilling +
          equipmentLessThanTwentyBilling +
          equipmentBetweenTwentyAndFiftyBilling +
          equipmentGreaterThanFiftyBilling +
          fluidLessThanTwentyBilling +
          fluidBetweenTwentyAndFiftyBilling +
          fluidGreaterThanFiftyBilling) *
        readjustment;

      return {
        rig: efficiency.rig,
        totalValue: parseFloat(totalValue.toFixed(2)),
        availableHoursBilling: availableHoursBilling,
        dtmLessThanTwentyBilling: dtmLessThanTwentyBilling,
        dtmBetweenTwentyAndFiftyBilling: dtmBetweenTwentyAndFiftyBilling,
        equipmentLessThanTwentyBilling: equipmentLessThanTwentyBilling,
        equipmentBetweenTwentyAndFiftyBilling:
          equipmentBetweenTwentyAndFiftyBilling,
        equipmentGreaterThanFiftyBilling: equipmentGreaterThanFiftyBilling,
        fluidLessThanTwentyBilling: fluidLessThanTwentyBilling,
        fluidBetweenTwentyAndFiftyBilling: fluidBetweenTwentyAndFiftyBilling,
        fluidGreaterThanFiftyBilling: fluidGreaterThanFiftyBilling,
      };
    }

    if (efficiency.rig === "SPT 116") {
      const availableHoursBilling = efficiency.availableHours * 919;
      const dtmLessThanTwentyBilling = efficiency.dtmLessThanTwenty * 5514;
      const dtmBetweenTwentyAndFiftyBilling =
        efficiency.dtmBetweenTwentyAndFifty * 7024;
      const equipmentLessThanTwentyBilling =
        efficiency.equipmentLessThanTwenty * 1756;
      const equipmentBetweenTwentyAndFiftyBilling =
        efficiency.equipmentBetweenTwentyAndFifty * 2634;
      const equipmentGreaterThanFiftyBilling =
        efficiency.equipmentGreaterThanFifty * 4390;
      const fluidLessThanTwentyBilling = efficiency.fluidLessThanTwenty * 2195;
      const fluidBetweenTwentyAndFiftyBilling =
        efficiency.fluidBetweenTwentyAndFifty * 3512;
      const fluidGreaterThanFiftyBilling =
        efficiency.fluidGreaterThanFifty * 3947;
      const readjustment = 1.5991;

      const totalValue =
        (availableHoursBilling +
          dtmLessThanTwentyBilling +
          dtmBetweenTwentyAndFiftyBilling +
          equipmentLessThanTwentyBilling +
          equipmentBetweenTwentyAndFiftyBilling +
          equipmentGreaterThanFiftyBilling +
          fluidLessThanTwentyBilling +
          fluidBetweenTwentyAndFiftyBilling +
          fluidGreaterThanFiftyBilling) *
        readjustment;

      return {
        rig: efficiency.rig,
        totalValue: parseFloat(totalValue.toFixed(2)),
        availableHoursBilling: availableHoursBilling,
        dtmLessThanTwentyBilling: dtmLessThanTwentyBilling,
        dtmBetweenTwentyAndFiftyBilling: dtmBetweenTwentyAndFiftyBilling,
        equipmentLessThanTwentyBilling: equipmentLessThanTwentyBilling,
        equipmentBetweenTwentyAndFiftyBilling:
          equipmentBetweenTwentyAndFiftyBilling,
        equipmentGreaterThanFiftyBilling: equipmentGreaterThanFiftyBilling,
        fluidLessThanTwentyBilling: fluidLessThanTwentyBilling,
        fluidBetweenTwentyAndFiftyBilling: fluidBetweenTwentyAndFiftyBilling,
        fluidGreaterThanFiftyBilling: fluidGreaterThanFiftyBilling,
      };
    }

    if (efficiency.rig === "SPT 151") {
      const availableHoursBilling = efficiency.availableHours * 919;
      const dtmLessThanTwentyBilling = efficiency.dtmLessThanTwenty * 5514;
      const dtmBetweenTwentyAndFiftyBilling =
        efficiency.dtmBetweenTwentyAndFifty * 7024;
      const equipmentLessThanTwentyBilling =
        efficiency.equipmentLessThanTwenty * 1756;
      const equipmentBetweenTwentyAndFiftyBilling =
        efficiency.equipmentBetweenTwentyAndFifty * 2634;
      const equipmentGreaterThanFiftyBilling =
        efficiency.equipmentGreaterThanFifty * 4390;
      const fluidLessThanTwentyBilling = efficiency.fluidLessThanTwenty * 2195;
      const fluidBetweenTwentyAndFiftyBilling =
        efficiency.fluidBetweenTwentyAndFifty * 3512;
      const fluidGreaterThanFiftyBilling =
        efficiency.fluidGreaterThanFifty * 3947;
      const readjustment = 1.5991;

      const totalValue =
        (availableHoursBilling +
          dtmLessThanTwentyBilling +
          dtmBetweenTwentyAndFiftyBilling +
          equipmentLessThanTwentyBilling +
          equipmentBetweenTwentyAndFiftyBilling +
          equipmentGreaterThanFiftyBilling +
          fluidLessThanTwentyBilling +
          fluidBetweenTwentyAndFiftyBilling +
          fluidGreaterThanFiftyBilling) *
        readjustment;

      return {
        rig: efficiency.rig,
        totalValue: parseFloat(totalValue.toFixed(2)),
        availableHoursBilling: availableHoursBilling,
        dtmLessThanTwentyBilling: dtmLessThanTwentyBilling,
        dtmBetweenTwentyAndFiftyBilling: dtmBetweenTwentyAndFiftyBilling,
        equipmentLessThanTwentyBilling: equipmentLessThanTwentyBilling,
        equipmentBetweenTwentyAndFiftyBilling:
          equipmentBetweenTwentyAndFiftyBilling,
        equipmentGreaterThanFiftyBilling: equipmentGreaterThanFiftyBilling,
        fluidLessThanTwentyBilling: fluidLessThanTwentyBilling,
        fluidBetweenTwentyAndFiftyBilling: fluidBetweenTwentyAndFiftyBilling,
        fluidGreaterThanFiftyBilling: fluidGreaterThanFiftyBilling,
      };
    }

    if (efficiency.rig === "SPT 60") {
      const availableHoursBilling = efficiency.availableHours * 919;
      const dtmLessThanTwentyBilling = efficiency.dtmLessThanTwenty * 5514;
      const dtmBetweenTwentyAndFiftyBilling =
        efficiency.dtmBetweenTwentyAndFifty * 7024;
      const equipmentLessThanTwentyBilling =
        efficiency.equipmentLessThanTwenty * 1756;
      const equipmentBetweenTwentyAndFiftyBilling =
        efficiency.equipmentBetweenTwentyAndFifty * 2634;
      const equipmentGreaterThanFiftyBilling =
        efficiency.equipmentGreaterThanFifty * 4390;
      const fluidLessThanTwentyBilling = efficiency.fluidLessThanTwenty * 2195;
      const fluidBetweenTwentyAndFiftyBilling =
        efficiency.fluidBetweenTwentyAndFifty * 3512;
      const fluidGreaterThanFiftyBilling =
        efficiency.fluidGreaterThanFifty * 3947;
      const readjustment = 1.5991;

      const totalValue =
        (availableHoursBilling +
          dtmLessThanTwentyBilling +
          dtmBetweenTwentyAndFiftyBilling +
          equipmentLessThanTwentyBilling +
          equipmentBetweenTwentyAndFiftyBilling +
          equipmentGreaterThanFiftyBilling +
          fluidLessThanTwentyBilling +
          fluidBetweenTwentyAndFiftyBilling +
          fluidGreaterThanFiftyBilling) *
        readjustment;

      return {
        rig: efficiency.rig,
        totalValue: parseFloat(totalValue.toFixed(2)),
        availableHoursBilling: availableHoursBilling,
        dtmLessThanTwentyBilling: dtmLessThanTwentyBilling,
        dtmBetweenTwentyAndFiftyBilling: dtmBetweenTwentyAndFiftyBilling,
        equipmentLessThanTwentyBilling: equipmentLessThanTwentyBilling,
        equipmentBetweenTwentyAndFiftyBilling:
          equipmentBetweenTwentyAndFiftyBilling,
        equipmentGreaterThanFiftyBilling: equipmentGreaterThanFiftyBilling,
        fluidLessThanTwentyBilling: fluidLessThanTwentyBilling,
        fluidBetweenTwentyAndFiftyBilling: fluidBetweenTwentyAndFiftyBilling,
        fluidGreaterThanFiftyBilling: fluidGreaterThanFiftyBilling,
      };
    }
  });

  return mappedInvoices;
};
