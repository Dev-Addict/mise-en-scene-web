import {Details} from 'express-useragent';

import {OS} from '../../../types';

export const useragentToOSConvertor = ({
	isiPad,
	isiPod,
	isiPhone,
	isMac,
	isAndroid,
	isAndroidTablet,
	isBlackberry,
	isChromeOS,
	isWindows,
	isWindowsPhone,
	isSamsung,
	isRaspberry,
	isLinux64,
	isLinux,
	isKindleFire,
}: Details): OS => {
	switch (true) {
		case isiPad:
			return OS.IPAD_OS;
		case isiPod:
			return OS.IPOD_OS;
		case isiPhone:
			return OS.IPHONE_OS;
		case isMac:
			return OS.MAC_OS;
		case isChromeOS:
			return OS.CHROME_OS;
		case isBlackberry:
			return OS.BLACKBERRY_OS;
		case isKindleFire:
			return OS.FIRE_OS;
		case isWindowsPhone:
			return OS.WINDOWS_PHONE;
		case isWindows:
			return OS.WINDOWS;
		case isRaspberry:
			return OS.RASPBERRY_OS;
		case isAndroid:
		case isAndroidTablet:
			return OS.ANDROID;
		case isSamsung:
			return OS.SAMSUNG_OS;
		case isLinux:
		case isLinux64:
			return OS.LINUX;
		default:
			return OS.UNKNOWN;
	}
};
