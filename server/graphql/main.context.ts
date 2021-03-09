import {Request} from 'express';
import {ExpressContext} from 'apollo-server-express';
import {ContextFunction} from 'apollo-server-core';

export interface MainContext {
	req: Request;
	models: {};
}

export const mainContext: ContextFunction<ExpressContext, MainContext> =
	({
		 req,
	 }) => ({
		req,
		models: {},
	});
