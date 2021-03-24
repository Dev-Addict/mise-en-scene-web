import {Response} from 'express';
import {Model} from 'mongoose';
import {ExpressContext} from 'apollo-server-express';
import {ContextFunction} from 'apollo-server-core';

import {
	Cast,
	CastImage,
	CastVideo,
	Company,
	ICast,
	ICastImage,
	ICastVideo,
	ICompany,
	IMovie,
	IMovieAward,
	IMovieImage,
	IMovieRating,
	IMovieRole,
	IMovieVideo,
	IUser,
	Movie,
	MovieAward,
	MovieImage,
	MovieRating,
	MovieRole,
	MovieVideo,
	User,
} from '../models';
import {Request} from '../types';

export interface MainContext {
	req: Request;
	res: Response;
	models: {
		Cast: Model<ICast>;
		CastImage: Model<ICastImage>;
		CastVideo: Model<ICastVideo>;
		Company: Model<ICompany>;
		Movie: Model<IMovie>;
		MovieAward: Model<IMovieAward>;
		MovieImage: Model<IMovieImage>;
		MovieRating: Model<IMovieRating>;
		MovieRole: Model<IMovieRole>;
		MovieVideo: Model<IMovieVideo>;
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
		Cast,
		CastImage,
		CastVideo,
		Company,
		Movie,
		MovieAward,
		MovieImage,
		MovieRating,
		MovieRole,
		MovieVideo,
		User,
	},
});
