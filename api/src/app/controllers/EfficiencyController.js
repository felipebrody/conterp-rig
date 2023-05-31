const EfficienciesRepositories = require("../repositories/EfficienciesRepositories");
const RigsRepositories = require("../../app/repositories/RigsRepositories");
const UsersRepositories = require("../../app/repositories/UsersRepositories");
const isValidUUID = require("../utils/isValidUUID");
const GlossDetailsRepositories = require("../repositories/GlossDetailsRepositories");
const GlossPeriodsRepositories = require("../repositories/GlossPeriodsRepositories");
const RepairDetailsRepositories = require("../repositories/RepairDetailsRepositories");
const RepairPeriodsRepositories = require("../repositories/RepairPeriodsRepositories");
const DtmDetailsRepositories = require("../repositories/DtmRepositories");
const OilWellRepositories = require("../repositories/OilWellRepositories");

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
      dtm_hours,
      equipment_ratio,
      fluid_ratio,
      gloss_periods,
      repair_periods,
      working_periods,
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

    const efficiency = await EfficienciesRepositories.create({
      date,
      rig_id,
      user_id,
      oil_well,
      available_hours,
    });

    if (has_gloss_hours) {
      const glossDetail = await GlossDetailsRepositories.create({
        efficiency_id: efficiency.id,
      });

      await gloss_periods.map(
        async (
          {
            end_time_gloss,
            start_time_gloss,
            gloss_classification,
            gloss_description,
          },
          index
        ) => {
          let startTimeString = null;
          let endTimeString = null;

          let startTimeNumber = null;
          let endTimeNumber = null;

          startTimeString = start_time_gloss.split(":");
          endTimeString = end_time_gloss.split(":");

          startTimeNumber = startTimeString[0];
          endTimeNumber = endTimeString[0];

          if (startTimeNumber[0] > endTimeNumber[0]) {
            return response.status(404).json({
              error: `O horário final não pode ser menor que o inicial! 
              Período: ${index + 1}`,
            });
          }

          if (!gloss_classification) {
            return response.status(404).json({
              error: `Classifique o Período: ${index + 1}`,
            });
          }

          await GlossPeriodsRepositories.create({
            start_time_gloss,
            end_time_gloss,
            gloss_classification,
            gloss_description,
            gloss_detail_id: glossDetail.id,
          });
        }
      );
    }

    if (has_repair_hours) {
      const repairDetail = await RepairDetailsRepositories.create({
        efficiency_id: efficiency.id,
      });

      await repair_periods.map(
        async (
          {
            end_time_repair,
            start_time_repair,
            repair_classification,
            repair_description,
          },
          index
        ) => {
          let startTimeString = null;
          let endTimeString = null;

          let startTimeNumber = null;
          let endTimeNumber = null;

          startTimeString = start_time_repair.split(":");
          endTimeString = end_time_repair.split(":");

          startTimeNumber = startTimeString[0];
          endTimeNumber = endTimeString[0];

          if (startTimeNumber[0] > endTimeNumber[0]) {
            return response.status(404).json({
              error: `O horário final não pode ser menor que o inicial! 
              Período: ${index + 1}`,
            });
          }

          if (!repair_classification) {
            return response.status(404).json({
              error: `Classifique o Período: ${index + 1}`,
            });
          }

          await RepairPeriodsRepositories.create({
            start_time_repair,
            end_time_repair,
            repair_classification,
            repair_description,
            repair_detail_id: repairDetail.id,
          });
        }
      );
    }

    if (dtm_hours) {
      await DtmDetailsRepositories.create({
        dtm_hours,
        dtm_distance,
        efficiency_id: efficiency.id,
      });
    }

    if (fluid_ratio) {
      await FluidRatioRepositories.create({
        fluid_ratio,
        efficiency_id: efficiency.id,
      });
    }

    if (equipment_ratio) {
      await EquipmentRatioRepositories.create({
        equipment_ratio,
        efficiency_id: efficiency.id,
      });
    }

    return response.status(201).json(efficiency);

    if (
      endTimeNumber -
        startTimeNumber +
        available_hours +
        repair_hours +
        dtm_hours >
      24
    ) {
      return response
        .status(404)
        .json({ error: "A soma dos horários não pode ser maior que 24 Horas" });
    }

    if (
      endTimeNumber -
        startTimeNumber +
        available_hours +
        repair_hours +
        dtm_hours <
      24
    ) {
      return response
        .status(404)
        .json({ error: "A soma dos horários não pode ser menor que 24 Horas" });
    }

    response.status(201).json(efficiency);
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
