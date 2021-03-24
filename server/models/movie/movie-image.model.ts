import {Document, model, Schema, Types} from 'mongoose';

const movieImageSchema = new Schema({
	title: {
		type: String,
		required: [true, '0xE000032'],
	},
	description: {
		type: String,
		max: [200, '0xE000033'],
	},
	movie: {
		type: Types.ObjectId,
		required: [true, '0xE000034'],
	},
	image: {
		type: String,
		required: [true, '0xE000035'],
	},
});

export interface MovieImageModel {
	title: string;
	description?: string;
	movie: string;
	image: string;
}

export interface IMovieImage extends MovieImageModel, Document {}

export const MovieImage = model<IMovieImage>('MovieImage', movieImageSchema);
