import {DatesContext} from "./DatesContext";
import {useContext} from "react";

export const useDatesContext = () => {
  return useContext(DatesContext);
};
