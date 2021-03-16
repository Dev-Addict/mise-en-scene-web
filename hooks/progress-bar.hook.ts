import {useEffect} from 'react';
import {useRouter} from 'next/router';
import NProgress from 'nprogress';

export const useProgressBar = () => {
	const router = useRouter();

	useEffect(() => {
		let routeChangeStart = () => NProgress.start();
		let routeChangeComplete = () => NProgress.done();

		router.events.on('routeChangeStart', routeChangeStart);
		router.events.on('routeChangeComplete', routeChangeComplete);
		router.events.on('routeChangeError', routeChangeComplete);
		return () => {
			router.events.off('routeChangeStart', routeChangeStart);
			router.events.off('routeChangeComplete', routeChangeComplete);
			router.events.off('routeChangeError', routeChangeComplete);
		};
	}, []);
};
