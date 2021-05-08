import {useEffect, useLayoutEffect} from 'react';
import {useRouter} from 'next/router';

import {useSocket} from '../contexts';

export const useOnlineRouter = () => {
	const router = useRouter();
	const {socket} = useSocket();

	useEffect(() => {
		const leave = () => {
			socket?.emit('leave');
		};

		router.events.on('routeChangeComplete', leave);
		window.addEventListener('beforeunload', leave);

		return () => {
			router.events.off('routeChangeComplete', leave);
			window.removeEventListener('beforeunload', leave);
		};
	}, []);
};
