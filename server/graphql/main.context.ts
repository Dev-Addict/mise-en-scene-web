import {Response} from 'express';
import {Model} from 'mongoose';
import {ExpressContext} from 'apollo-server-express';
import {ContextFunction} from 'apollo-server-core';

import {IUser, User} from '../models';
import {Request} from '../types';

export interface MainContext {
	req: Request;
	res: Response;
	models: {
		User: Model<IUser>;
	};
}

export const mainContext: ContextFunction<ExpressContext, MainContext> = ({
	req,
	res,
}) => ({
	req,
	res,
	models: {
		User,
	},
});
