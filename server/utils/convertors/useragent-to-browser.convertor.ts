import {Details} from 'express-useragent';

import {Browser} from '../../../types';

export const useragentToBrowserConvertor = ({
	isAmaya,
	isCaptive,
	isChrome,
	isCurl,
	isEdge,
	isEpiphany,
	isFirefox,
	isFlock,
	isIE,
	isKonqueror,
	isOmniWeb,
	isOpera,
	isSafari,
	isSeaMonkey,
	isSilk,
	isWebkit,
	isWinJs,
}: Details): Browser => {
	switch (true) {
		case isSilk:
			return Browser.SILK;
		case isAmaya:
			return Browser.AMAYA;
		case isCurl:
			return Browser.CURL;
		case isCaptive:
			return Browser.CAPTIVE;
		case isEpiphany:
			return Browser.EPIPHANY;
		case isKonqueror:
			return Browser.KONQUEROR;
		case isOmniWeb:
			return Browser.OMNI_WEB;
		case isSeaMonkey:
			return Browser.SEA_MONKEY;
		case isFlock:
			return Browser.FLOCK;
		case isIE:
			return Browser.IE;
		case isSafari:
			return Browser.SAFARI;
		case isFirefox:
			return Browser.FIREFOX;
		case isEdge:
			return Browser.EDGE;
		case isOpera:
			return Browser.OPERA;
		case isChrome:
			return Browser.CHROME;
		case isWebkit:
			return Browser.WEBKIT;
		case isWinJs:
			return Browser.WIN_JS;
		default:
			return Browser.UNKNOWN;
	}
};
