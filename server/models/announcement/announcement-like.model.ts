import {Document, model, Schema, Types} from 'mongoose';

const announcementLikeSchema = new Schema({
	announcement: {
		type: Types.ObjectId,
		ref: 'Announcement',
		required: [true, '0xE00004E'],
	},
	user: {
		type: Types.ObjectId,
		ref: 'User',
		required: [true, '0xE00004F'],
	},
});

export interface AnnouncementLikeModel {
	announcement: string;
	user: string;
}

export interface IAnnouncementLike extends AnnouncementLikeModel, Document {}

export const AnnouncementLike = model<IAnnouncementLike>(
	'AnnouncementLike',
	announcementLikeSchema
);
