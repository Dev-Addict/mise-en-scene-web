import {createContext} from 'react';
import {Socket, io} from 'socket.io-client';

export interface SocketContextType {
	socket?: Socket;
}

export const SocketContext = createContext<SocketContextType>({
	socket: undefined,
});
