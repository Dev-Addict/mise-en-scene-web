import {Document, model, Schema, Types} from 'mongoose';

import {NotificationType} from '../../../types';

const notificationSchema = new Schema({
	to: {
		type: Types.ObjectId,
		required: [true, ''],
		ref: 'User',
	},
	type: {
		type: String,
		enum: {
			values: Object.values(NotificationType),
			message: '',
		},
	},
	user: {
		type: Types.ObjectId,
		ref: 'User',
	},
	announcement: {
		type: Types.ObjectId,
		ref: 'Announcement',
	},
	post: {
		type: Types.ObjectId,
		ref: 'Post',
	},
	seen: {
		type: Boolean,
		default: false,
	},
});

export interface NotificationModel {
	to: string;
	type: NotificationType;
	user?: string;
	announcement?: string;
	post?: string;
	seen: boolean;
}

export interface INotification extends NotificationModel, Document {}

export const Notification = model<INotification>(
	'Notification',
	notificationSchema
);
