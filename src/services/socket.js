import { io } from "socket.io-client";

// Ensure there is NO trailing slash at the end of the URL
const SOCKET_URL = "https://nrislaw.rxchartsquare.com";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  // Removing the forced "websocket" transport allows the client
  // to use "polling" first, which is more stable for establishing
  // the initial connection.
  transports: ["polling", "websocket"],
  withCredentials: true,
});
