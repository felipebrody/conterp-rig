import HttpClient from "./utils/HttpClient";

class OilWellsServices {
  constructor() {
    this.HttpClient = new HttpClient("http://localhost:3001");
  }

  async listOilWells() {
    const rigs = await this.HttpClient.get(`/oil-well`);

    console.log("Poços no http", rigs);

    return rigs;
  }
}

export default new OilWellsServices();
