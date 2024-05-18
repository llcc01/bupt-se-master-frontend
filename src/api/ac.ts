import { aGet } from "./api";

export const turnOnAcMaster = () => {
  return aGet("/api/unit/on");
};

export const turnOffAcMaster = () => {
  return aGet("/api/unit/off");
};

