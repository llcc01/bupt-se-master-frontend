import { aGet } from "./api";

export const getLogs = () => {
  return aGet("/api/logs/all");
};

export const getReport = (
  roomId: string,
  queryTime: string,
  reportType: string
) => {
  return aGet(`/api/reports/${roomId}/${queryTime}/${reportType}`);
};

export const getCost = (roomId: string, queryTime: string) => {
  return aGet(`/api/costs/${roomId}/${queryTime}`);
};
