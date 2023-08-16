import axios from "axios";

import {localHostEndPoint} from "../utils/endPoints";
//import { timeout } from "../utils/timeout";

export const httpClientAxios = axios.create({
  baseURL: localHostEndPoint,
});
