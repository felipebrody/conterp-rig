import APIError from "../errors/APIError";
import HttpClient from "./utils/HttpClient";

class EfficienciesServices {
  constructor() {
    this.HttpClient = new HttpClient("http://localhost:3001");
  }

  async listEfficiencies() {
    const efficiencies = await this.HttpClient.get(`/efficiencies`);

    return efficiencies;
  }

  async listEfficienciesByRigId(id) {
    const efficiencies = await this.HttpClient.get(`/efficiencies-rig/${id}`);
    return efficiencies;
  }

  async createEfficiency({
    date,
    gloss_periods,
    repair_periods,
    equipment_ratio,
    fluid_ratio,
    dtm_distance,
    available_hours,
    dtm_hours,
    has_repair_hours,
    has_gloss_hours,
    rig_id,
    user_id,
    oil_well,
  }) {
    const body = {
      date,
      gloss_periods,
      repair_periods,
      equipment_ratio,
      fluid_ratio,
      dtm_distance,
      available_hours,
      dtm_hours,
      has_repair_hours,
      has_gloss_hours,
      rig_id,
      user_id,
      oil_well,
    };
    const efficiency = await this.HttpClient.post(`/efficiencies`, {
      body: body,
    });

    return efficiency;
  }
}

export default new EfficienciesServices();
