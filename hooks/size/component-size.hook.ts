import {RefObject, useEffect, useState} from 'react';

interface Size {
	width: number;
	height: number;
}

export const useComponentSize = (ref: RefObject<HTMLElement>) => {
	const [size, setSize] = useState<Size>({
		width: ref.current?.clientWidth || 0,
		height: ref.current?.clientHeight || 0,
	});

	useEffect(() => {
		function handleResize() {
			setSize({
				width: ref.current?.clientWidth || 0,
				height: ref.current?.clientHeight || 0,
			});
		}

		ref.current?.addEventListener('resize', handleResize);
		window.addEventListener('resize', handleResize);

		handleResize();

		return () => {
			ref.current?.removeEventListener('resize', handleResize);
			window.removeEventListener('resize', handleResize);
		};
	}, [ref.current]);

	return size;
};
