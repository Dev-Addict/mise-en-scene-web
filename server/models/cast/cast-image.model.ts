import {Document, model, Schema, Types} from 'mongoose';

const castImageSchema = new Schema({
	title: {
		type: String,
		required: [true, '0xE00001A'],
	},
	description: {
		type: String,
		max: [200, '0xE00001B'],
	},
	cast: {
		type: Types.ObjectId,
		required: [true, '0xE00001C'],
	},
	image: {
		type: String,
		required: [true, '0xE00001D'],
	},
});

export interface CastImageModel {
	title: string;
	description?: string;
	cast: string;
	image: string;
}

export interface ICastImage extends CastImageModel, Document {}

export const CastImage = model<ICastImage>('CastImage', castImageSchema);
