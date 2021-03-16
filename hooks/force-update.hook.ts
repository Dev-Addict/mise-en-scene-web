import {useEffect, useState} from 'react';

export const useForceUpdate = () => {
	const [isMounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return isMounted;
};
