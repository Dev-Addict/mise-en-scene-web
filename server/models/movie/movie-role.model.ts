import {Document, model, Schema, Types} from 'mongoose';

const movieRoleSchema = new Schema({
	role: {
		type: String,
		required: [true, '0xE00003B'],
	},
	actor: {
		type: Types.ObjectId,
		required: [true, '0xE00003C'],
	},
	movie: {
		type: Types.ObjectId,
		required: [true, '0xE00003D'],
	},
	picture: {
		type: String,
	},
});

export interface MovieRoleModel {
	role: string;
	actor: string;
	movie: string;
	picture?: string;
}

export interface IMovieRole extends MovieRoleModel, Document {}

export const MovieRole = model<IMovieRole>('MovieRole', movieRoleSchema);
