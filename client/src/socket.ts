import { io } from "socket.io-client";

// export const API_URL = "http://10.14.73.40:3000";
export const API_URL = "http://localhost:3000";
export const socket = io(API_URL);
