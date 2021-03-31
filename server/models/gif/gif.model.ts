import {Document, model, Schema} from 'mongoose';

const gifSchema = new Schema({
	giphyId: {
		type: String,
		required: [true, '0xE000042'],
		unique: [true, '0xE000043'],
	},
	title: {
		type: String,
		required: [true, '0xE000044'],
	},
	url: {
		type: String,
		required: [true, '0xE000045'],
	},
	width: {
		type: Number,
		required: [true, '0xE000046'],
	},
	height: {
		type: Number,
		required: [true, '0xE000047'],
	},
});

export interface GifModel {
	giphyId: string;
	title: string;
	url: string;
	width: number;
	height: number;
}

export interface IGif extends GifModel, Document {}

export const Gif = model<IGif>('Gif', gifSchema);
