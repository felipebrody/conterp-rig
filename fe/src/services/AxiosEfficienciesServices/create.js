import {httpClientAxios} from "../httpClientAxios";

export const create = async (body) => {
  console.log("body", body);
  const {data} = await httpClientAxios.post("/efficiencies", body);
  return data;
};
