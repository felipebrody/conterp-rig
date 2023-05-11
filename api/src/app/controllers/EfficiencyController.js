const EfficienciesRepositories = require("../repositories/EfficienciesRepositories");
const RigsRepositories = require("../../app/repositories/RigsRepositories");
const UsersRepositories = require("../../app/repositories/UsersRepositories");
const isValidUUID = require("../utils/isValidUUID");
const GlossDetailsRepositories = require("../repositories/GlossDetailsRepositories");
const RepairDetailsRepositories = require("../repositories/RepairDetailsRepositories")
const DtmDetailsRepositories = require("../repositories/DtmRepositories")

class EfficiencyController {
  async index(request, response) {
    const efficiency = await EfficienciesRepositories.findAll();
    response.json(efficiency);
  }

  async indexRig(request, response) {
    const { id } = request.params

    const efficiencies = await EfficienciesRepositories.findByRigId(id)
    response.json(efficiencies)

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
      return response.status(404).json({ error: "O usuário precisa estar vinculado a uma sonda!" });
    }


    const startTimeNumber = start_time_gloss.split(":")
    const endTimeNumber = end_time_gloss.split(":")

    if (startTimeNumber[0] > endTimeNumber[0]) {
      return response.status(404).json({ error: "O horário final não pode ser menor que o inicial!" });
    }


    if (((endTimeNumber[0] - startTimeNumber[0]) + available_hours + repair_hours) > 24) {
      return response.status(404).json({ error: "A soma dos horários não pode ser maior que 24 Horas" });
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

    if (dtm_hours) {
      console.log(dtm_distance)
      dtmDetails = await DtmDetailsRepositories.create({
        dtm_hours,
        dtm_distance,
      })
    }

    if (has_gloss_hours) {
      glossDetails = await GlossDetailsRepositories.create({
        start_time_gloss,
        end_time_gloss,
        gloss_classification,
      });
    }

    if (has_repair_hours) {
      repairDetails = await RepairDetailsRepositories.create({
        repair_classification,
        repair_hours
      })
    }

    const efficiency = await EfficienciesRepositories.create({
      date,
      rig_id,
      user_id,
      gloss_detail_id: glossDetails?.id || null,
      available_hours,
      repair_detail_id: repairDetails?.id || null,
      dtm_detail_id: dtmDetails?.id || null,
      equipment_ratio,
      fluid_ratio,
    });

    response.status(201).json(efficiency);
  }

  async show(request, response) {

    const { id } = request.params

    const efficiency = await EfficienciesRepositories.findById(id)
    response.json(efficiency)
  }

  async update(request, response) {
    const { id } = request.params;

    const { date, gloss_hours, available_hours, repair_hours, dtm_hours } =
      request.body;

    if (
      !date ||
      !gloss_hours ||
      !available_hours ||
      !repair_hours ||
      !dtm_hours
    ) {
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
