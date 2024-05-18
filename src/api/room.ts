import { Room } from "../type";
import { aGet, aPost } from "./api";

export const getRooms = () => {
  return aGet("/api/rooms/all").then((res) => {
    return Promise.resolve({
      data: res.data.data.map((room: Room) => ({ ...room, id: room.roomId })),
      total: res.data.data.length,
    });
  });
};

export const getRoom = (id: string) => {
  return aGet(`/api/rooms/${id}`).then((res) => {
    const room: Room = res.data.data;
    console.log({
      data: { ...room, id: room.roomId },
    });
    return Promise.resolve({
      data: { ...room, id: room.roomId },
    });
  });
};

export const createRoom = () => {
  return aPost("/api/rooms/create").then((res) => {
    const room: Room = res.data.data;
    console.log({
      data: { ...room, id: room.roomId },
    });
    return Promise.resolve({
      data: { ...room, id: room.roomId },
    });
  });
};

export const getAvailableRooms = () => {
  return aGet("/api/rooms/available");
};
