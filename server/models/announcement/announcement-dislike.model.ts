import {Document, model, Schema, Types} from 'mongoose';

const announcementDislikeSchema = new Schema({
	announcement: {
		type: Types.ObjectId,
		ref: 'Announcement',
		required: [true, '0xE00004C'],
	},
	user: {
		type: Types.ObjectId,
		ref: 'User',
		required: [true, '0xE00004D'],
	},
});

export interface AnnouncementDislikeModel {
	announcement: string;
	user: string;
}

export interface IAnnouncementDislike
	extends AnnouncementDislikeModel,
		Document {}

export const AnnouncementDislike = model<IAnnouncementDislike>(
	'AnnouncementDislike',
	announcementDislikeSchema
);
