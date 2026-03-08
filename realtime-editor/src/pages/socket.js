import { io } from "socket.io-client";

let socket = null;

export const initSocket = async () => {

  const SOCKET_URL = window.location.origin;

  const options = {
    forceNew: true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ["websocket"],
  };

  socket = io(SOCKET_URL, options);

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.log("Socket connection failed:", err.message);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  return socket;
};