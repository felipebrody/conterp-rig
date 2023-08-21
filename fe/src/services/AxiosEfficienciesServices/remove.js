import {httpClientAxios} from "../httpClientAxios";

export const remove = async (id) => {
  const {data} = await httpClientAxios.delete(`/efficiencies/${id}`);
  return data;
};
