import {Schema} from 'mongoose';

export const pointSchema = new Schema({
	type: {
		type: String,
		enum: {
			values: ['Point'],
			message: '0xE000023',
		},
		required: [true, '0xE000024'],
	},
	coordinates: {
		type: [Number],
	},
});

export interface PointModel {
	type: 'Point';
	coordinates: [number, number];
}
