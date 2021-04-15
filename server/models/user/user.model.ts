import crypto from 'crypto';
import {Document, model, Schema} from 'mongoose';
import {compare, hash} from 'bcrypt';

import {
	emailValidator,
	nameValidator,
	passwordValidator,
	usernameValidator,
} from '../../../utils';
import {Gender} from '../../../types';

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
	displayName?: string;
	passwordChangedAt?: number;
	passwordResetToken?: string;
	passwordResetTokenExpiresAt?: number;
	emailChangedAt?: number;
	emailResetToken?: string;
	emailResetTokenExpiresAt?: number;
}

export interface UserBaseDocument extends Document, UserModel {}

const userSchema = new Schema<UserBaseDocument>({
	firstname: {
		type: String,
		validate: {
			validator: (value: string): boolean => !!nameValidator(value, false),
			message: '0xE000000',
		},
	},
	lastname: {
		type: String,
		validate: {
			validator: (value: string): boolean => !!nameValidator(value, false),
			message: '0xE000001',
		},
	},
	email: {
		type: String,
		validate: {
			validator: (value: string): boolean => !!emailValidator(value, false),
			message: '0xE000002',
		},
		required: [true, '0xE000003'],
		unique: [true, '0xE000004'],
	},
	password: {
		type: String,
		required: [true, '0xE000005'],
		select: false,
		validate: {
			validator: (value: string) => !!passwordValidator(value),
			message: '0xE000006',
		},
	},
	avatar: {
		type: String,
		default: 'default.svg',
	},
	birthday: {
		type: Date,
	},
	gender: {
		type: String,
		enum: {
			values: Object.values(Gender),
			message: '0xE000007',
		},
	},
	username: {
		type: String,
		lowercase: true,
		required: [true, '0xE000008'],
		validate: {
			validator: (value: string) => !!usernameValidator(value, false),
			message: '0xE000009',
		},
		unique: [true, '0xE00000A'],
	},
	bio: {
		type: String,
		max: [200, '0xE00000B'],
	},
	displayName: {
		type: String,
		max: [20, '0xE00000C'],
		min: [4, '0xE00000C'],
	},
	passwordChangedAt: {
		type: Date,
	},
	passwordResetToken: {
		type: String,
	},
	passwordResetTokenExpiresAt: {
		type: Date,
	},
	emailChangedAt: {
		type: Date,
	},
	emailResetToken: {
		type: String,
	},
	emailResetTokenExpiresAt: {
		type: Date,
	},
});

userSchema.methods.correctPassword = async function (
	candidatePassword: string,
	userPassword: string
): Promise<boolean> {
	return await compare(candidatePassword, userPassword);
};

userSchema.methods.isPasswordChanged = function (jwtTimestamp: number) {
	if (this.passwordChangedAt || this.emailChangedAt) {
		const passwordChangedTimestamp = Math.floor(
			(this.passwordChangedAt || 0) / 1000
		);
		const emailChangedTimestamp = Math.floor((this.emailChangedAt || 0) / 1000);

		return (
			jwtTimestamp < passwordChangedTimestamp ||
			jwtTimestamp < emailChangedTimestamp
		);
	}

	return false;
};

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');

	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	this.passwordResetTokenExpiresAt = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

userSchema.methods.createEmailResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');

	this.emailResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	this.emailResetTokenExpiresAt = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

export interface IUser extends UserModel, Document {
	correctPassword(
		candidatePassword: string,
		userPassword: string
	): Promise<boolean>;

	isPasswordChanged(jwtTimestamp: number): boolean;

	createPasswordResetToken(): string;

	createEmailResetToken(): string;
}

userSchema.pre<IUser>('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await hash(this.password, 12);
	next();
});

userSchema.pre<IUser>('save', async function (next) {
	if (!this.isModified('password') || this.isNew) return next();

	this.passwordChangedAt = Date.now() - 1000;
	next();
});

export const User = model<IUser>('User', userSchema);
