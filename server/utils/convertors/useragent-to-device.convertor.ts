import {Details} from 'express-useragent';

import {Device} from '../../../types';

export const useragentToDeviceConvertor = ({
	isMobile,
	isTablet,
	isDesktop,
	isSmartTV,
}: Details): Device => {
	switch (true) {
		case isSmartTV:
			return Device.TV;
		case isDesktop:
			return Device.DESKTOP;
		case isTablet:
			return Device.TABLET;
		case isMobile:
			return Device.PHONE;
		default:
			return Device.UNKNOWN;
	}
};
