import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';

const URL = "http://localhost:5050";
export const socket = io(URL);

// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });