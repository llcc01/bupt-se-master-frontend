import { aGet } from "./api";

export const getLogs = () => {
  return aGet("/api/logs/all");
};

export const getReport = (roomId: string, reportType: string) => {
  return aGet(`/api/reports/getReport`, { roomId, reportType }).then((res) => {
    return Promise.resolve({
      data: [
        {
          ...res.data.data,
          id: res.data.data?.roomId,
          reportId: res.data.data?.roomId,
          log: res.data.data?.log,
        },
      ],
      total: res.data.data?.length ?? 0,
    });
  });
};

export const getCost = (roomId: string) => {
  return aGet(`/api/costs/${roomId}`);
};
