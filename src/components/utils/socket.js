// socket.js
import socketIOClient from "socket.io-client";
import { api } from "../../mockData";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = socketIOClient(api.dev, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionDelay: 2000,
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
