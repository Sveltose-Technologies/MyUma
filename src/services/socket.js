import { io } from "socket.io-client";

const SOCKET_URL = "https://nrislaw.rxchartsquare.com/"; // Your Backend URL

export const socket = io(SOCKET_URL, {
  autoConnect: false, // We will connect manually after login
  transports: ["websocket"],
});
