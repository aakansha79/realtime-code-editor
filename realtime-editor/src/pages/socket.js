import { io } from "socket.io-client";

let socket;

export const initSocket = async () => {
  const options = {
    forceNew: true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };

  
  socket = io(window.location.origin, options);

  socket.on("connect_error", (err) => {
    console.log("Socket connection failed:", err.message);
  });

  return socket;
};