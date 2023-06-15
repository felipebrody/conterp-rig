import HttpClient from "./utils/HttpClient";

class OilWellsServices {
  constructor() {
    this.HttpClient = new HttpClient("http://localhost:3001");
  }

  async listOilWells() {
    const rigs = await this.HttpClient.get(`/oil-well`);

    return rigs;
  }
}

export default new OilWellsServices();
