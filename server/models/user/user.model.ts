import {Document, model, Schema} from 'mongoose';
import {compare, hash} from 'bcrypt';

export enum Gender {
	MALE = 'MALE',
	FEMALE = 'FEMALE',
	CUSTOM = 'CUSTOM',
}

const userSchema = new Schema({
	firstname: {
		type: String,
		validate: {
			validator: (value: string): boolean =>
				/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð ,.'-]+$/u.test(
					value
				),
			message: '0xE000001',
		},
	},
	lastname: {
		type: String,
		validate: {
			validator: (value: string): boolean =>
				/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð ,.'-]+$/u.test(
					value
				),
			message: '0xE000002',
		},
	},
	email: {
		type: String,
		validate: {
			validator: (value: string): boolean =>
				/^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
					value
				),
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
			validator: (value: string) =>
				/^(?=.*([@#$%~`!^&*()\-_+=}{\[\]|\\/:;"'<>,.?]))(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
					value
				),
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
			values: [Gender.MALE, Gender.FEMALE, Gender.CUSTOM],
			message: '0xE000008',
		},
	},
	username: {
		type: String,
		lowercase: true,
		required: [true, '0xE000009'],
		validate: {
			validator: (value: string) => /^[a-z0-9_]{4,}$/.test(value),
			message: '0xE00000A'
		}
	},
	bio: {
		type: String,
		max: [200, '0xE00000B']
	}
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
