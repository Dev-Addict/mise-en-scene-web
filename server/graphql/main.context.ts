import {Request} from 'express';
import {Model} from 'mongoose';
import {ExpressContext} from 'apollo-server-express';
import {ContextFunction} from 'apollo-server-core';

import {IUser, User} from '../models';

export interface MainContext {
	req: Request;
	models: {
		User: Model<IUser>
	};
}

export const mainContext: ContextFunction<ExpressContext, MainContext> =
	({
		 req,
	 }) => ({
		req,
		models: {
			User
		},
	});
