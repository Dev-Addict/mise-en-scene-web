import {sign} from 'jsonwebtoken';

export const signToken = <T extends {_id?: any}>({_id}: T) =>
	sign(
		{
			id: _id,
		},
		process.env.JSON_WEB_TOKEN_SECRET!,
		{
			expiresIn: process.env.JSON_WEB_TOKEN_TIME,
		}
	);
