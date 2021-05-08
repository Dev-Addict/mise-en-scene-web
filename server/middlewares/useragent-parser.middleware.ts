import {Handler} from 'express';
import {parse} from 'express-useragent';

import {useragentToUserDetailConvertor} from '../utils';
import {User} from '../models';

export const useragentParser: Handler = async (req, res, next) => {
	const source = req.header('user-agent');
	req.userDetail = source
		? await useragentToUserDetailConvertor(parse(source), req, User)
		: undefined;

	req.headers['user-agent'] = undefined;
	res.removeHeader('user-agent');

	next();
};
