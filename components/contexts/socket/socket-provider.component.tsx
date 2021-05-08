import React, {FC, useLayoutEffect, useState} from 'react';
import {io, Socket} from 'socket.io-client';

import {SocketContext} from './socket.context';
import {BASE_URL} from '../../../config';
import {useRouter} from 'next/router';

interface Props {}

export const SocketProvider: FC<Props> = ({children}) => {
	const router = useRouter();

	const [socket, setSocket] = useState<Socket | undefined>(undefined);

	useLayoutEffect(() => {
		setSocket(io(BASE_URL));

		return () => {
			socket?.disconnect();
		};
	}, []);

	useLayoutEffect(() => {}, []);

	return (
		<SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
	);
};
