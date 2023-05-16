const EfficienciesRepositories = require("../repositories/EfficienciesRepositories");
const RigsRepositories = require("../../app/repositories/RigsRepositories");
const UsersRepositories = require("../../app/repositories/UsersRepositories");
const isValidUUID = require("../utils/isValidUUID");
const GlossDetailsRepositories = require("../repositories/GlossDetailsRepositories");
const RepairDetailsRepositories = require("../repositories/RepairDetailsRepositories");
const DtmDetailsRepositories = require("../repositories/DtmRepositories");

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
      rig_id,
      user_id,
      available_hours,
      repair_hours,
      repair_classification,
      has_repair_hours,
      has_gloss_hours,
      end_time_gloss,
      start_time_gloss,
      gloss_classification,
      dtm_hours,
      dtm_distance,
      equipment_ratio,
      fluid_ratio,
    } = request.body;

    if (!date || !rig_id || !user_id) {
      return response
        .status(404)
        .json({ error: "O usuário precisa estar vinculado a uma sonda!" });
    }

    let startTimeString = null;
    let endTimeString = null;

    let startTimeNumber = null;
    let endTimeNumber = null;

    if (has_gloss_hours) {
      startTimeString = start_time_gloss.split(":");
      endTimeString = end_time_gloss.split(":");

      startTimeNumber = startTimeString[0];
      endTimeNumber = endTimeString[0];
    } else {
      startTimeNumber = 0;
      endTimeNumber = 0;
    }

    console.log("strings", startTimeString, endTimeString);

    if (startTimeNumber[0] > endTimeNumber[0]) {
      return response
        .status(404)
        .json({ error: "O horário final não pode ser menor que o inicial!" });
    }

    console.log(
      "numbers",
      startTimeNumber,
      endTimeNumber,
      dtm_hours,
      repair_hours
    );

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

    const efficiencyDayAlreadyExists =
      await EfficienciesRepositories.findByDate({ rig_id, date });

    if (efficiencyDayAlreadyExists) {
      return response.status(404).json({ error: "Data já preenchida" });
    }

    if (!isValidUUID(rig_id) || !isValidUUID(user_id)) {
      return response.status(404).json({ error: "IDs Inválidos!" });
    }

    const rigExists = await RigsRepositories.findById(rig_id);

    if (!rigExists) {
      return response.status(404).json({ error: "Base não encontrada." });
    }

    const userIdExists = await UsersRepositories.findById(user_id);

    if (!userIdExists) {
      return response.status(404).json({ error: "Usuário não encontrado." });
    }

    let glossDetails = null;
    let repairDetails = null;
    let dtmDetails = null;

    if (dtm_hours || dtm_distance) {
      console.log("dtm data", dtm_hours, dtm_distance);
      if (!dtm_hours || !dtm_distance) {
        return response
          .status(404)
          .json({ error: "Todos os dados da DTM são necessários!" });
      }

      dtmDetails = await DtmDetailsRepositories.create({
        dtm_hours,
        dtm_distance,
      });
    }

    if (has_gloss_hours) {
      if (!start_time_gloss || !end_time_gloss || !gloss_classification) {
        return response
          .status(404)
          .json({ error: "Todos os dados da glosa são necessários!" });
      }
      glossDetails = await GlossDetailsRepositories.create({
        start_time_gloss,
        end_time_gloss,
        gloss_classification,
      });
    }

    if (has_repair_hours) {
      if (!repair_hours || !repair_classification) {
        return response
          .status(404)
          .json({ error: "Todos os dados do Reparo são necessários!" });
      }

      repairDetails = await RepairDetailsRepositories.create({
        repair_classification,
        repair_hours,
      });
    }

    const efficiency = await EfficienciesRepositories.create({
      date,
      rig_id,
      user_id,
      gloss_detail_id: glossDetails?.id || null,
      available_hours,
      repair_detail_id: repairDetails?.id || null,
      dtm_detail_id: dtmDetails?.id || null,
      equipment_ratio: equipment_ratio || 0,
      fluid_ratio: fluid_ratio || 0,
    });

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
