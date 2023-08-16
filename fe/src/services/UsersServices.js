import HttpClient from "./utils/HttpClient";

import {localHostEndPoint, renderHostEndPoint} from "../utils/endPoints";

class UsersServices {
  constructor() {
    this.HttpClient = new HttpClient(localHostEndPoint);
  }

  async listUsers(orderBy = "asc") {
    const users = await this.HttpClient.get(`/users?orderBy=${orderBy}`);

    return users;
  }

  async createUser(user) {
    const body = {
      name: user.name,
      email: user.email,
      password: user.password,
      access_level: user.access_level,
      rig_id: user.rig_id || null,
    };

    return this.HttpClient.post(`/users`, {
      body: body,
    });
  }

  async loginUser(user) {
    const body = {
      email: user.email,
      password: user.password,
    };

    return this.HttpClient.post(`/users/login`, {
      body: body,
    });
  }
}

export default new UsersServices();
