import {httpClientAxios} from "../httpClientAxios";

export const getAll = async (filters) => {
  const {data} = await httpClientAxios.get("/efficiencies", {
    params: filters,
  });
  return data ?? [];
};
