import {Document, model, Schema} from 'mongoose';

import {PointModel, pointSchema} from '../geo';
import {countryValidator} from '../../../utils';

const castSchema = new Schema({
	firstnameEn: {
		type: String,
		required: [true, '0xE000013'],
	},
	middlenameEn: {
		type: String,
	},
	lastnameEn: {
		type: String,
		required: [true, '0xE000014'],
	},
	firstnameFa: {
		type: String,
		required: [true, '0xE000015'],
	},
	middlenameFa: {
		type: String,
	},
	lastnameFa: {
		type: String,
		required: [true, '0xE000016'],
	},
	firstnameLocal: {
		type: String,
		required: [true, '0xE000017'],
	},
	middlenameLocal: {
		type: String,
	},
	lastnameLocal: {
		type: String,
		required: [true, '0xE000018'],
	},
	bornDate: {
		type: Date,
	},
	diedDate: {
		type: Date,
	},
	bornCity: {
		type: pointSchema,
	},
	bio: {
		type: String,
	},
	nationality: {
		type: String,
		validate: {
			validator: (value: string) => !!countryValidator(value, false),
			message: '0xE000019',
		},
	},
});

export interface CastModel {
	firstnameEn: string;
	middlenameEn?: string;
	lastnameEn: string;
	firstnameFa: string;
	middlenameFa?: string;
	lastnameFa: string;
	firstnameLocal: string;
	middlenameLocal?: string;
	lastnameLocal: string;
	bornDate?: number;
	diedDate?: number;
	bordCity?: PointModel;
	bio?: string;
	nationality?: string;
}

export interface ICast extends CastModel, Document {}

export const Cast = model<ICast>('MovieCast', castSchema);
