import {httpClientAxios} from "../httpClientAxios";

export const getById = async (id) => {
  const {data} = await httpClientAxios.get(`/efficiencies/${id}`);

  return data ?? [];
};
