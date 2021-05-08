import {Model} from 'mongoose';
import {Details} from 'express-useragent';
import {lookup} from 'geoip-lite';

import {Platform, UNKNOWN, UserDetail} from '../../../types';
import {Request} from '../../types';
import {protect} from '../auth';
import {IUser} from '../../models';
import {useragentToBrowserConvertor} from './useragent-to-browser.convertor';
import {useragentToDeviceConvertor} from './useragent-to-device.convertor';
import {useragentToOSConvertor} from './useragent-to-os.convertor';

export const useragentToUserDetailConvertor = async (
	details: Details,
	req: Request,
	User: Model<IUser>
): Promise<UserDetail> => {
	const user = req.user || (await protect(req, User, false));

	const {city, country, ll} = lookup(req.clientIp || ':::') || {};

	const {isBot, version} = details;

	return {
		authed: !!user,
		bot: isBot,
		browser: useragentToBrowserConvertor(details),
		city: city || UNKNOWN,
		country: country || UNKNOWN,
		device: useragentToDeviceConvertor(details),
		ip: req.clientIp || UNKNOWN,
		latitude: ll ? (ll[0] || UNKNOWN).toString() : UNKNOWN,
		longitude: ll ? (ll[1] || UNKNOWN).toString() : UNKNOWN,
		os: useragentToOSConvertor(details),
		platform: Platform.WEB,
		timeSpent: 0,
		user: user?.id || UNKNOWN,
		version: version || UNKNOWN,
	};
};
