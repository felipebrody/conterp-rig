const EfficienciesRepositories = require("../repositories/EfficienciesRepositories");
const RigsRepositories = require("../../app/repositories/RigsRepositories");
const UsersRepositories = require("../../app/repositories/UsersRepositories");
const isValidUUID = require("../utils/isValidUUID");
const GlossDetailsRepositories = require("../repositories/GlossDetailsRepositories");
const GlossPeriodsRepositories = require("../repositories/GlossPeriodsRepositories");
const RepairDetailsRepositories = require("../repositories/RepairDetailsRepositories");
const RepairPeriodsRepositories = require("../repositories/RepairPeriodsRepositories");
const DtmDetailsRepositories = require("../repositories/DtmDetailsRepositories");
const OilWellRepositories = require("../repositories/OilWellRepositories");
const DtmPeriodsRepositories = require("../repositories/DtmPeriodsRepositories");

const OperatingPeriodsDetailsRepositories = require("../repositories/OperatingPeriodsDetailsRepositories");

const OperatingPeriodsRepositories = require("../repositories/OperatingPeriodsRepositories");

const FluidRatioRepositories = require("../repositories/FluidRatioRepositories");
const EquipmentRatioRepositories = require("../repositories/EquipmentRatioRepositories");

class EfficiencyController {
  async index(request, response) {
    const efficiency = await EfficienciesRepositories.findAll();
    response.json(efficiency);
  }

  async indexRig(request, response) {
    const { id } = request.params;

    const efficiencies = await EfficienciesRepositories.findByRigId(id);
    response.json(efficiencies);
  }

  async store(request, response) {
    const {
      date,
      available_hours,
      efficiency,
      equipment_ratio,
      fluid_ratio,
      gloss_periods,
      repair_periods,
      working_periods,
      user_id,
      rig_id,
      dtm_periods,
    } = request.body;

    if (!date || !rig_id || !user_id) {
      return response
        .status(404)
        .json({ error: "O usuário precisa estar vinculado a uma sonda!" });
    }

    const rigExists = await RigsRepositories.findById(rig_id);

    if (!rigExists) {
      return response.status(404).json({ error: "Base não encontrada." });
    }

    const efficiencyDayAlreadyExists =
      await EfficienciesRepositories.findByDate({ rig_id, date });

    if (efficiencyDayAlreadyExists) {
      return response.status(404).json({ error: "Data já preenchida" });
    }

    if (!isValidUUID(rig_id) || !isValidUUID(user_id)) {
      return response.status(404).json({ error: "IDs Inválidos!" });
    }

    const userIdExists = await UsersRepositories.findById(user_id);

    if (!userIdExists) {
      return response.status(404).json({ error: "Usuário não encontrado." });
    }

    const verifyPeriodsHours = (startTime, endTime) => {
      let startTimeString = startTime.split(":");
      let endTimeString = endTime.split(":");

      let startTimeNumber = parseInt(startTimeString[0]);
      let endTimeNumber = parseInt(endTimeString[0]);

      if (startTimeNumber > endTimeNumber) {
        return false;
      } else {
        return true;
      }
    };

    //teste======================//

    if (gloss_periods.length !== 0) {
      try {
        for (const {
          start_time,
          end_time,
          gloss_classification,
          oil_well_id,
        } of gloss_periods) {
          if (!gloss_classification) {
            throw new Error(`Classifique o Período`);
          }

          if (!oil_well_id) {
            throw new Error(`Período sem poço selecionado`);
          }

          const verifiedPeriods = verifyPeriodsHours(start_time, end_time);

          if (verifiedPeriods === false) {
            throw new Error(`O horário final não pode ser menor que o inicial`);
          }
        }
      } catch (error) {
        return response.status(404).json({ error: error.message });
      }
    }

    //========================================

    if (repair_periods.length !== 0) {
      try {
        for (const {
          start_time,
          end_time,
          repair_classification,
          oil_well_id,
        } of repair_periods) {
          if (!repair_classification) {
            throw new Error(`Classifique o Período`);
          }

          if (!oil_well_id) {
            throw new Error(`Período sem poço selecionado`);
          }

          const verifiedPeriods = verifyPeriodsHours(start_time, end_time);

          if (verifiedPeriods === false) {
            throw new Error(`O horário final não pode ser menor que o inicial`);
          }
        }
      } catch (error) {
        return response.status(404).json({ error: error.message });
      }
    }

    if (working_periods.length !== 0) {
      try {
        for (const { start_time, end_time, oil_well_id } of working_periods) {
          if (!oil_well_id) {
            throw new Error(`Período sem poço selecionado`);
          }

          const verifiedPeriods = verifyPeriodsHours(start_time, end_time);

          if (verifiedPeriods === false) {
            throw new Error(`O horário final não pode ser menor que o inicial`);
          }
        }
      } catch (error) {
        return response.status(404).json({ error: error.message });
      }
    }

    if (dtm_periods.length !== 0) {
      try {
        for (const {
          start_time,
          end_time,
          oil_well_id,
          dtm_distance,
        } of dtm_periods) {
          if (!dtm_distance) {
            throw new Error(`Classifique o Período`);
          }

          if (!oil_well_id) {
            throw new Error(`Período sem poço selecionado`);
          }

          const verifiedPeriods = verifyPeriodsHours(start_time, end_time);

          if (verifiedPeriods === false) {
            throw new Error(`O horário final não pode ser menor que o inicial`);
          }
        }
      } catch (error) {
        return response.status(404).json({ error: error.message });
      }
    }

    const efficiencyObj = await EfficienciesRepositories.create({
      date,
      available_hours,
      efficiency,
      rig_id,
      user_id,
    });

    if (gloss_periods.length !== 0) {
      const glossDetail = await GlossDetailsRepositories.create({
        efficiency_id: efficiencyObj.id,
      });

      for (const {
        start_time,
        end_time,
        gloss_classification,
        oil_well_id,
        description,
      } of gloss_periods) {
        await GlossPeriodsRepositories.create({
          start_time,
          end_time,
          gloss_classification,
          oil_well_id,
          description,
          gloss_detail_id: glossDetail.id,
        });
      }
    }

    if (repair_periods.length !== 0) {
      const repairDetail = await RepairDetailsRepositories.create({
        efficiency_id: efficiencyObj.id,
      });

      for (const {
        start_time,
        end_time,
        description,
        repair_classification,
        oil_well_id,
      } of repair_periods) {
        await RepairPeriodsRepositories.create({
          start_time,
          end_time,
          description,
          repair_classification,
          oil_well_id,
          repair_detail_id: repairDetail.id,
        });
      }
    }

    if (working_periods.length !== 0) {
      const operatingPeriodsDetails =
        await OperatingPeriodsDetailsRepositories.create({
          efficiency_id: efficiencyObj.id,
        });

      for (const {
        start_time,
        end_time,
        description,
        oil_well_id,
      } of working_periods) {
        await OperatingPeriodsRepositories.create({
          start_time,
          end_time,
          description,
          oil_well_id,
          operating_detail_id: operatingPeriodsDetails.id,
        });
      }
    }

    if (dtm_periods.length !== 0) {
      const dtmDetails = await DtmDetailsRepositories.create({
        efficiency_id: efficiencyObj.id,
      });

      for (const {
        start_time,
        end_time,
        description,
        oil_well_id,
        dtm_distance,
      } of dtm_periods) {
        await DtmPeriodsRepositories.create({
          start_time,
          end_time,
          description,
          oil_well_id,
          dtm_distance,
          dtm_detail_id: dtmDetails.id,
        });
      }
    }

    if (fluid_ratio) {
      for (const ratio of fluid_ratio) {
        await FluidRatioRepositories.create({
          fluid_ratio: ratio.fluid_ratio,
          efficiency_id: efficiencyObj.id,
        });
      }
    }

    if (equipment_ratio) {
      for (const ratio of equipment_ratio) {
        await EquipmentRatioRepositories.create({
          equipment_ratio: ratio.equipment_ratio,
          efficiency_id: efficiencyObj.id,
        });
      }
    }

    return response.status(201).json(efficiencyObj);
  }

  async show(request, response) {
    const { id } = request.params;

    const efficiency = await EfficienciesRepositories.findById(id);
    response.json(efficiency);
  }

  async update(request, response) {
    const { id } = request.params;

    const { date, gloss_hours, available_hours, repair_hours, dtm_hours } =
      request.body;

    if (!date || !available_hours) {
      return response
        .status(404)
        .json({ error: "Todos os campos são obrigatórios!" });
    }

    const updatedEfficiency = await EfficienciesRepositories.update(id, {
      date,
      gloss_hours,
      available_hours,
      repair_hours,
      dtm_hours,
    });

    response.status(200).json(updatedEfficiency);
  }

  async delete(request, response) {
    const { id } = request.params;

    await EfficienciesRepositories.delete(id);

    response.sendStatus(204);
  }
}
module.exports = new EfficiencyController();
