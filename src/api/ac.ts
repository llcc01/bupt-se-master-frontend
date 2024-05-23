import { aGet, aPost } from "./api";

export const turnOnAcMaster = () => {
  return aPost("/api/unit/on");
};

export const turnOffAcMaster = () => {
  return aPost("/api/unit/off");
};

export const getAcMasterStatus = () => {
  return aGet("/api/unit/CentralUnit");
}

export const setAcMasterFrequency = (frequency: number) => {
  return aPost(`/api/unit/frequency?frequency=${frequency}`);
}