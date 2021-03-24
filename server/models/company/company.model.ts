import {Document, model, Schema} from 'mongoose';

const companySchema = new Schema({
	name: {
		type: String,
		required: [true, '0xE000022'],
	},
	logo: {
		type: String,
	},
});

export interface CompanyModel {
	name: string;
	logo?: string;
}

export interface ICompany extends CompanyModel, Document {}

export const Company = model<ICompany>('Company', companySchema);
