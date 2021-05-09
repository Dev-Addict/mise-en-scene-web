import React, {FC, useEffect, useState} from 'react';
import {io, Socket} from 'socket.io-client';

import {SocketContext} from './socket.context';
import {BASE_URL} from '../../../config';

interface Props {}

export const SocketProvider: FC<Props> = ({children}) => {
	const [socket, setSocket] = useState<Socket | undefined>(undefined);

	useEffect(() => {
		setSocket(io(BASE_URL));

		return () => {
			socket?.disconnect();
		};
	}, []);

	return (
		<SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
	);
};
