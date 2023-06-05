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

  async getEfficiencyById(id) {
    const efficiency = await this.HttpClient.get(`/efficiencies/${id}`);
    return efficiency;
  }

  async listEfficienciesByRigId(id) {
    const efficiencies = await this.HttpClient.get(`/efficiencies-rig/${id}`);
    return efficiencies;
  }

  async createEfficiency({
    date,
    available_hours,
    dtm_hours,
    equipment_ratio,
    fluid_ratio,
    gloss_periods,
    repair_periods,
    working_periods,
    user_id,
    rig_id,
    dtm_periods,
  }) {
    const body = {
      date,
      available_hours,
      dtm_hours,
      equipment_ratio,
      fluid_ratio,
      gloss_periods,
      repair_periods,
      working_periods,
      user_id,
      rig_id,
      dtm_periods,
    };
    const efficiency = await this.HttpClient.post(`/efficiencies`, {
      body: body,
    });

    return efficiency;
  }
}

export default new EfficienciesServices();
