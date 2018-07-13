import socketIOClient from 'socket.io-client';

const server = 'http://localhost:3001/';
const socket = socketIOClient(server);

export default socket;
