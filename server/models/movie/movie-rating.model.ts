import {Document, model, Schema, Types} from 'mongoose';
import {integerValidator} from '../../../utils/validators/integer.validator';

const movieRatingSchema = new Schema({
	user: {
		type: Types.ObjectId,
		required: [true, '0xE000036'],
	},
	rating: {
		type: Number,
		required: [true, '0xE000037'],
		min: [1, '0xE000038'],
		max: [10, '0xE000039'],
		validate: {
			validator: (value: string) => !!integerValidator(value, false),
			message: '0xE00003A',
		},
	},
});

export interface MovieRatingModel {
	user: string;
	rating: number;
}

export interface IMovieRating extends MovieRatingModel, Document {}

export const MovieRating = model<IMovieRating>(
	'MovieRating',
	movieRatingSchema
);
