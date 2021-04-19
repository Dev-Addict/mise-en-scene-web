import {Document, model, Schema, Types} from 'mongoose';
import {ChannelAdminPermission} from '../../../types';

const channelAdminSchema = new Schema({
	channel: {
		type: Types.ObjectId,
		required: [true, ''],
		ref: 'Channel',
	},
	user: {
		type: Types.ObjectId,
		required: [true, ''],
		ref: 'User',
	},
	permissions: {
		type: [String],
		enum: {
			values: Object.values(ChannelAdminPermission),
			message: '',
		},
	},
});

export interface ChannelAdminModel {
	channel: string;
	user: string;
	permissions: ChannelAdminPermission[];
}

export interface IChannelAdmin extends Document, ChannelAdminModel {}

export const ChannelAdmin = model<IChannelAdmin>(
	'ChannelAdmin',
	channelAdminSchema
);
