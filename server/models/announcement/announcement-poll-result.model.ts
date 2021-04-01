import {Document, model, Schema, Types} from 'mongoose';

const announcementPollResultSchema = new Schema({
	poll: {
		type: Types.ObjectId,
		ref: 'AnnouncementPoll',
		required: [true, '0xE000051'],
	},
	user: {
		type: Types.ObjectId,
		ref: 'User',
		required: [true, '0xE000052'],
	},
	option: {
		type: Number,
		required: [true, '0xE000053'],
	},
});

export interface AnnouncementPollResultModel {
	poll: string;
	user: string;
	option: number;
}

export interface IAnnouncementPollResult
	extends AnnouncementPollResultModel,
		Document {}

export const AnnouncementPollResult = model<IAnnouncementPollResult>(
	'AnnouncementPollResult',
	announcementPollResultSchema
);
