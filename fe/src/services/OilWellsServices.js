import HttpClient from "./utils/HttpClient";
import {localHostEndPoint, renderHostEndPoint} from "../utils/endPoints";

class OilWellsServices {
  constructor() {
    this.HttpClient = new HttpClient(localHostEndPoint);
  }

  async listOilWells() {
    const rigs = await this.HttpClient.get(`/oil-well`);

    return rigs;
  }
}

export default new OilWellsServices();
