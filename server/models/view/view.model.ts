import {Document, model, Schema, Types} from 'mongoose';

import {Device, OS, Unknown, UNKNOWN} from '../../../types';

const viewSchema = new Schema(
	{
		authed: {
			type: Boolean,
			default: false,
		},
		bot: {
			type: Boolean,
			default: false,
		},
		channel: {
			type: Types.ObjectId,
			ref: 'Channel',
		},
		city: {
			type: String,
			default: UNKNOWN,
		},
		conversations: {
			type: Boolean,
			default: false,
		},
		country: {
			type: String,
			default: UNKNOWN,
		},
		device: {
			type: String,
			enum: {
				values: Object.values(Device),
				message: '',
			},
			default: Device.UNKNOWN,
		},
		ip: {
			type: String,
			default: UNKNOWN,
		},
		latitude: {
			type: String,
			default: UNKNOWN,
		},
		longitude: {
			type: String,
			default: UNKNOWN,
		},
		os: {
			type: String,
			enum: {
				values: Object.values(OS),
				message: '',
			},
			default: OS.UNKNOWN,
		},
		page: {
			type: String,
			default: UNKNOWN,
		},
		post: {
			type: Types.ObjectId,
			ref: 'Post',
		},
		posts: {
			type: Boolean,
			default: false,
		},
		timeSpent: {
			type: Number,
			default: 0,
		},
		user: {
			type: Types.ObjectId,
			ref: 'User',
		},
		version: {
			type: String,
			default: UNKNOWN,
		},
		ended: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: {
			updatedAt: 'viewEnd',
			createdAt: 'viewStart',
		},
	}
);

export interface ViewModel {
	authed: boolean;
	bot: boolean;
	channel?: string;
	city: string | Unknown;
	conversations: boolean;
	country: string | Unknown;
	device: Device;
	ip: string;
	latitude: string;
	longitude: string;
	os: OS;
	page: string | Unknown;
	post?: string;
	posts: boolean;
	timeSpent: number;
	user?: string;
	version: string | Unknown;
	viewEnd: number | Date;
	viewStart: number | Date;
	ended: boolean;
}

export interface IView extends ViewModel, Document {}

export const View = model<IView>('View', viewSchema);
