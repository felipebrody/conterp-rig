const OilWellRepositories = require("../repositories/OilWellRepositories");
const UserRepositories = require("../repositories/UsersRepositories");
const isValidUUID = require("../utils/isValidUUID");

class OilWellController {
  //List all rigs
  async index(request, response) {
    const rigs = await OilWellRepositories.findAll();
    response.json(rigs);
  }

  //Show a base
  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "Invalid category ID" });
    }

    const base = await OilWellRepositories.findById(id);

    if (!base) {
      return response.status(404).json({ error: "rig não encontrada" });
    }
    response.json(base);
  }

  //Create a base
  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(404).json({ error: "Nome é obrigatório!" });
    }

    const rigNameExists = await OilWellRepositories.findByName(name);

    if (rigNameExists) {
      return response.status(404).json({ error: "Nome já existe!" });
    }

    const rig = await OilWellRepositories.create(name);

    response.status(201).json(rig);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    if (!name) {
      return response.status(404).json({ error: "Name is required!" });
    }

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "Invalid category ID" });
    }

    const oilWellExists = await OilWellRepositories.findById(id);

    if (!oilWellExists) {
      return response.status(404).json({ error: "Poço não encontrada." });
    }

    const rigNameExists = await OilWellRepositories.findByName(name);

    if (rigNameExists) {
      return response.status(404).json({ error: "Nome já existe!" });
    }

    const updatedOilWell = await OilWellRepositories.update(id, { name });

    response.json(updatedOilWell);
  }

  async delete(request, response) {
    const { id } = request.params;

    await OilWellRepositories.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new OilWellController();
