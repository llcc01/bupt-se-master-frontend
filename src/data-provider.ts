import { CreateParams, GetListParams } from "react-admin";
import { createRoom, getRooms } from "./api/room";

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
  getOne: (resource: string, params: unknown) => {
    console.log("getOne", resource, params);
    return Promise.reject("Not implemented");
  },
  getMunknown: (resource: string, params: unknown) => {
    console.log("getMunknown", resource, params);
    return Promise.reject("Not implemented");
  },
  getMunknownReference: (resource: string, params: unknown) => {
    console.log("getMunknownReference", resource, params);
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
  updateMunknown: (resource: string, params: unknown) => {
    console.log("updateMunknown", resource, params);
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
