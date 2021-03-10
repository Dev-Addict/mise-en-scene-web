import {Response} from 'express';

export const signCookie = (res: Response, name: string, value: string) => {
	res.cookie(name, value, {
		maxAge: (<number | undefined>process.env.COOKIE_TIME || 0) * 24 * 60 * 60,
		httpOnly: true,
		secure: true,
	});
};
