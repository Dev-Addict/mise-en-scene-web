import {Document, model, Schema, Types} from 'mongoose';

const announcementSchema = new Schema({
	text: {
		type: String,
		required: [true, '0xE00004A'],
		max: [2000, '0xE00004B'],
	},
	publishAt: {
		type: Date,
	},
	gif: {
		type: Types.ObjectId,
		ref: 'Gif',
	},
	images: {
		type: [Types.ObjectId],
		ref: 'Image',
	},
	poll: {
		type: Types.ObjectId,
		ref: 'AnnouncementPoll',
	},
});

export interface AnnouncementModel {
	text: string;
	publishAt?: Date;
	gif?: string;
	images?: string[];
	poll?: string;
}

export interface IAnnouncement extends AnnouncementModel, Document {}

export const Announcement = model<IAnnouncement>(
	'Announcement',
	announcementSchema
);
