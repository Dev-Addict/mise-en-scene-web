import {Document, model, Schema, Types} from 'mongoose';

const movieVideoSchema = new Schema({
	title: {
		type: String,
		required: [true, '0xE00003E'],
	},
	description: {
		type: String,
		max: [200, '0xE00003F'],
	},
	movie: {
		type: Types.ObjectId,
		required: [true, '0xE000040'],
	},
	video: {
		type: String,
		required: [true, '0xE000041'],
	},
});

export interface MovieVideoModel {
	title: string;
	description?: string;
	movie: string;
	video: string;
}

export interface IMovieVideo extends MovieVideoModel, Document {}

export const MovieVideo = model<IMovieVideo>('MovieVideo', movieVideoSchema);
