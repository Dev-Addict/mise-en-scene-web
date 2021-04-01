import {Document, model, Schema} from 'mongoose';

const announcementPollSchema = new Schema({
	question: {
		type: String,
		required: [true, '0xE000050'],
	},
	options: {
		type: [String],
	},
});

export interface AnnouncementPollModel {
	question: string;
	options: string[];
}

export interface IAnnouncementPoll extends AnnouncementPollModel, Document {}

export const AnnouncementPoll = model<IAnnouncementPoll>(
	'AnnouncementPoll',
	announcementPollSchema
);
