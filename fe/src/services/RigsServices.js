import HttpClient from "./utils/HttpClient";

import {localHostEndPoint, renderHostEndPoint} from "../utils/endPoints";

class RigsServices {
  constructor() {
    this.HttpClient = new HttpClient(localHostEndPoint);
  }

  async listRigs() {
    const rigs = await this.HttpClient.get(`/rigs`);

    return rigs;
  }
}

export default new RigsServices();
