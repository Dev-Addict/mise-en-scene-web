import {Model} from 'mongoose';

import {IUser} from '../../models';
import {AppError} from '../app-error.util';
import {Request} from '../../types';
import {getCookie} from '../cookies';
import {verify} from './verify.util';

interface TokenData {
	id: string;
}

export const protect = async (req: Request, User: Model<IUser>) => {
	const bearerToken = req.headers.authorization || getCookie(req, 'token');

	if (!bearerToken) throw new AppError('0xE00000A', 401);

	if (!bearerToken.startsWith('Bearer ')) throw new AppError('0xE00000C', 401);

	const token = bearerToken.split(' ')[1];

	const {id} = await verify<TokenData>(
		token,
		process.env.JSON_WEB_TOKEN_SECRET || ''
	);

	const user = await User.findById(id);

	if (!user) throw new AppError('0xE00000D', 401);

	req.user = user;

	return user;
};
