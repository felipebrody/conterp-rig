import HttpClient from "./utils/HttpClient";

class RigsServices {
  constructor() {
    this.HttpClient = new HttpClient("http://localhost:3001");
  }

  async listRigs() {
    const rigs = await this.HttpClient.get(`/rigs`);

    return rigs;
  }
}

export default new RigsServices();
