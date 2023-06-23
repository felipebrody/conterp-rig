import HttpClient from "./utils/HttpClient";

class RigsServices {
  constructor() {
    this.HttpClient = new HttpClient("https://conter-rig-backend.onrender.com");
  }

  async listRigs() {
    const rigs = await this.HttpClient.get(`/rigs`);

    return rigs;
  }
}

export default new RigsServices();
