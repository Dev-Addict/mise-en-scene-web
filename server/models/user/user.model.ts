import {Document, model, Schema} from 'mongoose';
import {compare, hash} from 'bcrypt';
import {emailValidator, nameValidator, passwordValidator, usernameValidator} from '../../../utils';

export enum Gender {
	MALE = 'MALE',
	FEMALE = 'FEMALE',
	CUSTOM = 'CUSTOM',
}

const userSchema = new Schema({
	firstname: {
		type: String,
		validate: {
			validator: (value: string): boolean => !!nameValidator(value, false),
			message: '0xE000001',
		},
	},
	lastname: {
		type: String,
		validate: {
			validator: (value: string): boolean => !!nameValidator(value, false),
			message: '0xE000002',
		},
	},
	email: {
		type: String,
		validate: {
			validator: (value: string): boolean => !!emailValidator(value, false),
			message: '0xE000003',
		},
		required: [true, '0xE000004'],
		unique: [true, '0xE000005'],
	},
	password: {
		type: String,
		required: [true, '0xE000006'],
		select: false,
		validate: {
			validator: (value: string) => !!passwordValidator(value),
			message: '0xE000007',
		},
	},
	avatar: {
		type: String,
		default: 'default.jpg',
	},
	birthday: {
		type: Date,
	},
	gender: {
		type: String,
		enum: {
			values: Object.values(Gender),
			message: '0xE000008',
		},
	},
	username: {
		type: String,
		lowercase: true,
		required: [true, '0xE000009'],
		validate: {
			validator: (value: string) => !!usernameValidator(value, false),
			message: '0xE00000A'
		},
		unique: [true, '0xE00000C']
	},
	bio: {
		type: String,
		max: [200, '0xE00000B']
	},
});

export interface UserModel {
	firstname?: string;
	lastname?: string;
	email: string;
	password: string;
	avatar: string;
	birthday?: number;
	gender?: Gender;
	username: string;
	bio?: string;
}

userSchema.methods.correctPassword = async function (
	candidatePassword: string,
	userPassword: string
): Promise<boolean> {
	return await compare(candidatePassword, userPassword);
};

export interface IUser extends UserModel, Document {
	correctPassword(
		candidatePassword: string,
		userPassword: string
	): Promise<boolean>;
}

userSchema.pre<IUser>('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await hash(this.password, 12);
	next();
});

export const User = model<IUser>('User', userSchema);
