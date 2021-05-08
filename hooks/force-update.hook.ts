import {useEffect, useState} from 'react';

export const useForceUpdate = () => {
	const [isMounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);

		const immediate = setImmediate(() => {
			setMounted(true);
		});

		return () => {
			setMounted(false);
			clearImmediate(immediate);
		};
	}, []);

	return isMounted;
};
