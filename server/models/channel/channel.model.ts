import {Document, model, Schema, Types} from 'mongoose';

import {usernameValidator} from '../../../utils';

const channelSchema = new Schema({
	handle: {
		type: String,
		required: [true, ''],
		validator: {
			validate: (value: string) => usernameValidator(value, false),
			message: '',
		},
		unique: [true, ''],
	},
	name: {
		type: String,
		min: [4, ''],
		max: [20, ''],
		required: [true, ''],
	},
	owner: {
		type: Types.ObjectId,
		ref: 'User',
		required: [true, ''],
	},
	cover: {
		type: String,
		default: 'default.svg',
	},
	verified: {
		type: Boolean,
		default: false,
	},
});

export interface ChannelModel {
	handle: string;
	name: string;
	owner: string;
	cover: string;
	verified: boolean;
}

export interface IChannel extends Document, ChannelModel {}

export const Channel = model<IChannel>('Channel', channelSchema);
