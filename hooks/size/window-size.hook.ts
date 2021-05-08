import {useEffect, useState} from 'react';

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState({
		width: global.window ? window.innerWidth : 0,
		height: global.window ? window.innerHeight : 0,
	});

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: global.window ? window.innerWidth : 0,
				height: global.window ? window.innerHeight : 0,
			});
		}

		global.window && window.addEventListener('resize', handleResize);

		handleResize();

		return () =>
			global.window && window.removeEventListener('resize', handleResize);
	}, []);

	return windowSize;
};
