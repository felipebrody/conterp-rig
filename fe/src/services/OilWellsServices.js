import HttpClient from "./utils/HttpClient";

class OilWellsServices {
  constructor() {
    this.HttpClient = new HttpClient("https://conter-rig-backend.onrender.com");
  }

  async listOilWells() {
    const rigs = await this.HttpClient.get(`/oil-well`);

    return rigs;
  }
}

export default new OilWellsServices();
