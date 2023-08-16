import {httpClientAxios} from "../httpClientAxios";

export const getAll = async () => {
  const {data} = await httpClientAxios.get("/rigs");
  return data;
};
