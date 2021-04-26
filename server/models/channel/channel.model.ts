import {Document, model, Schema, Types} from 'mongoose';

import {usernameValidator} from '../../../utils';

const channelSchema = new Schema({
	handle: {
		type: String,
		required: [true, '0xE00006A'],
		validator: {
			validate: (value: string) => usernameValidator(value, false),
			message: '0xE00006B',
		},
		unique: [true, '0xE00006C'],
	},
	name: {
		type: String,
		min: [4, '0xE00006D'],
		max: [20, '0xE00006E'],
		required: [true, '0xE00006F'],
	},
	owner: {
		type: Types.ObjectId,
		ref: 'User',
		required: [true, '0xE000070'],
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
