import {Document, model, Schema, Types} from 'mongoose';

const castVideoSchema = new Schema({
	title: {
		type: String,
		required: [true, '0xE00001E'],
	},
	description: {
		type: String,
		max: [200, '0xE00001F'],
	},
	cast: {
		type: Types.ObjectId,
		required: [true, '0xE000020'],
	},
	video: {
		type: String,
		required: [true, '0xE000021'],
	},
});

export interface CastVideoModel {
	title: string;
	description?: string;
	cast: string;
	video: string;
}

export interface ICastVideo extends CastVideoModel, Document {}

export const CastVideo = model<ICastVideo>('CastVideo', castVideoSchema);
