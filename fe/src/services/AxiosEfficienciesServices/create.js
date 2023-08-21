import {httpClientAxios} from "../httpClientAxios";

export const create = async (body) => {
  const {data} = await httpClientAxios.post("/efficiencies", body);
  return data;
};
