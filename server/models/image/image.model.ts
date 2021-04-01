import {Document, model, Schema} from 'mongoose';

const imageSchema = new Schema({
	image: {
		type: String,
		required: [true, '0xE000046'],
	},
	directory: {
		type: String,
		required: [true, '0xE000047'],
	},
	width: {
		type: Number,
		required: [true, '0xE000048'],
	},
	height: {
		type: Number,
		required: [true, '0xE000049'],
	},
	alt: {
		type: String,
	},
});

export interface ImageModel {
	image: string;
	directory: string;
	width: number;
	height: number;
	alt?: string;
}

export interface IImage extends ImageModel, Document {}

export const Image = model<IImage>('Image', imageSchema);
