import {Response} from 'express';
import {Model} from 'mongoose';
import {ExpressContext} from 'apollo-server-express';
import {ContextFunction} from 'apollo-server-core';

import {
	Announcement,
	AnnouncementDislike,
	AnnouncementLike,
	AnnouncementPoll,
	AnnouncementPollResult,
	Cast,
	CastImage,
	CastVideo,
	Channel,
	ChannelAdmin,
	Company,
	Gif,
	IAnnouncement,
	IAnnouncementDislike,
	IAnnouncementLike,
	IAnnouncementPoll,
	IAnnouncementPollResult,
	ICast,
	ICastImage,
	ICastVideo,
	IChannel,
	IChannelAdmin,
	ICompany,
	IGif,
	IImage,
	Image,
	IMovie,
	IMovieAward,
	IMovieImage,
	IMovieRating,
	IMovieRole,
	IMovieVideo,
	IPost,
	IUser,
	IUserFollow,
	Movie,
	MovieAward,
	MovieImage,
	MovieRating,
	MovieRole,
	MovieVideo,
	Post,
	User,
	UserFollow,
} from '../models';
import {MailService} from '../utils';
import {Request} from '../types';

export interface MainContext {
	req: Request;
	res: Response;
	models: {
		Announcement: Model<IAnnouncement>;
		AnnouncementDislike: Model<IAnnouncementDislike>;
		AnnouncementLike: Model<IAnnouncementLike>;
		AnnouncementPoll: Model<IAnnouncementPoll>;
		AnnouncementPollResult: Model<IAnnouncementPollResult>;
		Cast: Model<ICast>;
		CastImage: Model<ICastImage>;
		CastVideo: Model<ICastVideo>;
		Channel: Model<IChannel>;
		ChannelAdmin: Model<IChannelAdmin>;
		Company: Model<ICompany>;
		Gif: Model<IGif>;
		Image: Model<IImage>;
		Movie: Model<IMovie>;
		MovieAward: Model<IMovieAward>;
		MovieImage: Model<IMovieImage>;
		MovieRating: Model<IMovieRating>;
		MovieRole: Model<IMovieRole>;
		MovieVideo: Model<IMovieVideo>;
		Post: Model<IPost>;
		User: Model<IUser>;
		UserFollow: Model<IUserFollow>;
	};
	mailService: MailService;
}

export const mainContext: ContextFunction<ExpressContext, MainContext> = ({
	req,
	res,
}) => ({
	req,
	res,
	models: {
		Announcement,
		AnnouncementDislike,
		AnnouncementLike,
		AnnouncementPoll,
		AnnouncementPollResult,
		Cast,
		CastImage,
		CastVideo,
		Channel,
		ChannelAdmin,
		Company,
		Gif,
		Image,
		Movie,
		MovieAward,
		MovieImage,
		MovieRating,
		MovieRole,
		MovieVideo,
		Post,
		User,
		UserFollow,
	},
	mailService: MailService.getInstance(),
});
