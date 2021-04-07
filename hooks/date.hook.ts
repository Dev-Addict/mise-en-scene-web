import {useEffect, useState} from 'react';

export const useDate = (time = Date.now()) => {
	const [difference, setDifference] = useState((Date.now() - time) / 1000);

	useEffect(() => {
		const interval = setInterval(() => {
			setDifference((Date.now() - time) / 1000);
		}, 1000);

		return () => clearInterval(interval);
	}, [time]);

	switch (true) {
		case difference < 60:
			return 'به تازگی';
		case difference < 3600:
			return `${Math.floor(difference / 60)} دقیقه`;
		case difference < 86400:
			return `${Math.floor(difference / 3600)} ساعت`;
		case difference < 604800:
			return `${Math.floor(difference / 86400)} روز`;
		case difference < 2419200:
			return `${Math.floor(difference / 604800)} هفته`;
		case difference < 29030400:
			return `${Math.floor(difference / 2419200)} ماه`;
		default:
			return `${Math.floor(difference / 29030400)} سال`;
	}
};
