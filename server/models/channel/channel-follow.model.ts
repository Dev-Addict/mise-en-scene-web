import {Document, model, Schema, Types} from 'mongoose';

const channelFollowSchema = new Schema({
	follower: {
		type: Types.ObjectId,
		required: [true, '0xE000087'],
	},
	following: {
		type: Types.ObjectId,
		required: [true, '0xE000088'],
	},
});

export interface ChannelFollowModel {
	follower: string;
	following: string;
}

export interface IChannelFollow extends ChannelFollowModel, Document {}

export const ChannelFollow = model<IChannelFollow>(
	'ChannelFollow',
	channelFollowSchema
);
