import {
  CreateParams,
  GetListParams,
  GetManyReferenceParams,
  GetOneParams,
} from "react-admin";
import { createRoom, getRoom, getRooms } from "./api/room";
import { getReport } from "./api/log";

export const dataProvider = {
  getList: (resource: string, params: GetListParams) => {
    console.log("getList", resource, params);
    if (resource === "rooms") {
      return getRooms();
    }
    if (resource === "controlLogs") {
      return Promise.reject("Not implemented");
    }
    return Promise.reject("Not implemented");
  },
  getOne: (resource: string, params: GetOneParams) => {
    console.log("getOne", resource, params);
    if (resource === "rooms") {
      return getRoom(params.id);
    }
    return Promise.reject("Not implemented");
  },
  getMany: (resource: string, params: unknown) => {
    console.log("getMany", resource, params);
    return Promise.reject("Not implemented");
  },
  getManyReference: (resource: string, params: GetManyReferenceParams) => {
    console.log("getManyReference", resource, params);
    if (resource === "reports") {
      return getReport(params.id as string, params.filter?.reportType as string);
    }
    return Promise.reject("Not implemented");
  },
  create: (resource: string, params: CreateParams) => {
    console.log("create", resource, params);
    if (resource === "rooms") {
      return createRoom();
    }
    return Promise.reject("Not implemented");
  },
  update: (resource: string, params: unknown) => {
    console.log("update", resource, params);
    return Promise.reject("Not implemented");
  },
  updateMany: (resource: string, params: unknown) => {
    console.log("updateMany", resource, params);
    return Promise.reject("Not implemented");
  },
  delete: (resource: string, params: unknown) => {
    console.log("delete", resource, params);
    return Promise.reject("Not implemented");
  },
  deleteMany: (resource: string, params: unknown) => {
    console.log("deleteMany", resource, params);
    if (resource === "rooms") {
      return Promise.reject("Not implemented");
    }
    return Promise.reject("Not implemented");
  },
};
