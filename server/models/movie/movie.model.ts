import {Document, model, Schema, Types} from 'mongoose';

import {MovieAgeRating, Genre} from '../../../types';
import {countryValidator} from '../../../utils';
import {languageValidator} from '../../../utils/validators/languange.validator';

export const movieSchema = new Schema({
	nameLocal: {
		type: String,
		required: [true, '0xE000025'],
	},
	nameFa: {
		type: String,
		required: [true, '0xE000026'],
	},
	nameEn: {
		type: String,
		required: [true, '0xE000027'],
	},
	release: {
		type: Date,
	},
	ageRating: {
		type: String,
		enum: {
			values: Object.values(MovieAgeRating),
			message: '0xE000028',
		},
		default: MovieAgeRating.NR,
	},
	description: {
		type: String,
		max: [400, '0xE000029'],
		min: [100, '0xE00002A'],
	},
	directors: {
		type: [Types.ObjectId],
	},
	genres: {
		type: [String],
		enum: {
			values: Object.values(Genre),
			message: '0xE00002B',
		},
	},
	owners: {
		type: [Types.ObjectId],
	},
	runtime: {
		type: Number,
	},
	countries: {
		type: [String],
		validate: {
			validator: (value: string) => !!countryValidator(value, false),
			message: '0xE00002C',
		},
	},
	writers: {
		type: [Types.ObjectId],
	},
	languages: {
		type: [String],
		validate: {
			validator: (value: string) => !!languageValidator(value, false),
			message: '0xE00002D',
		},
	},
	mainCountry: {
		type: String,
		validate: {
			validator: (value: string) => !!countryValidator(value),
			message: '0xE00002E',
		},
	},
	mainDirectors: {
		type: [Types.ObjectId],
	},
	mainWriters: {
		type: [Types.ObjectId],
	},
	mainLanguage: {
		type: String,
		validate: {
			validator: (value: string) => !!languageValidator(value, false),
			message: '0xE00002F',
		},
	},
});

export interface MovieModel {
	nameFa: string;
	nameEn: string;
	nameLocal: string;
	release?: number;
	ageRating: MovieAgeRating;
	description?: string;
	directors: string[];
	genres?: Genre[];
	owners: string[];
	runtime?: number;
	countries: string[];
	writers: string[];
	languages: string[];
	mainCountry: string[];
	mainDirectors: string[];
	mainWriters: string[];
	mainLanguage: string[];
}

export interface IMovie extends MovieModel, Document {}

export const Movie = model<IMovie>('Movie', movieSchema);
