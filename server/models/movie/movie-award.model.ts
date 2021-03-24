import {Document, model, Schema, Types} from 'mongoose';

const movieAwardSchema = new Schema({
	award: {
		type: String,
		required: [true, '0xE000030'],
	},
	name: {
		type: String,
		required: [true, '0xE000031'],
	},
	winners: {
		type: [Types.ObjectId],
	},
	nominations: {
		type: [Types.ObjectId],
	},
	roles: {
		type: [Types.ObjectId],
	},
});

export interface MovieAwardModel {
	award: string;
	name: string;
	winners: string[];
	nominations: string[];
	roles: string[];
}

export interface IMovieAward extends MovieAwardModel, Document {}

export const MovieAward = model<IMovieAward>('MovieAward', movieAwardSchema);
