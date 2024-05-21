import { number } from "react-admin";
import { aGet } from "./api";
import { Report } from "../type";

export const getLogs = () => {
  return aGet("/api/logs/all");
};

export const getReport = (roomId: string, reportType: string) => {
  return aGet(`/api/reports/getReport`, { roomId, reportType }).then((res) => {
    return Promise.resolve({
      data: [
        {
          ...res.data.data,
          id: res.data.data.roomId,
          reportId: res.data.data.roomId,
          details: res.data.data.details.split("\n").map((d: string) => ({
            str: d,
          })),
        },
      ],
      total: 1,
    });
  });
};

export const getCost = (roomId: string) => {
  return aGet(`/api/costs/${roomId}`);
};
