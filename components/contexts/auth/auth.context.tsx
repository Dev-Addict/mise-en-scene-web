import {createContext} from 'react';

import {Gender, None, User} from '../../../types';

export interface SignInData {
	authKey: string;
	password: string;
}

export interface SignUpData {
	email: string;
	username: string;
	password: string;
}

export interface ForgotPasswordData {
	authKey: string;
}

export interface ResetPasswordRequestData {
	authKey: string;
}

export interface ResetPasswordData {
	resetToken: string;
	password: string;
}

export interface ResetEmailRequestData {
	email: string;
}

export interface ResetEmailData {
	resetToken: string;
	email: string;
}

export interface VerifyEmailRequestData {
	email: string;
}

export interface VerifyEmailData {
	verifyToken: string;
}

export interface UpdateSelfData {
	avatar?: None<File>;
	bio?: None<string>;
	birthday?: None<number>;
	displayName?: None<string>;
	firstname?: None<string>;
	gender?: None<Gender>;
	lastname?: None<string>;
	username?: None<string>;
}

export type SignResponse =
	| {
			success: true;
	  }
	| {
			success: false;
			errors: string[];
	  };

export interface AuthContextType {
	isSigned: boolean;
	isLoading: boolean;
	signIn: (variables: SignInData) => Promise<SignResponse>;
	signUp: (variables: SignUpData) => Promise<SignResponse>;
	forgotPassword: (variables: ForgotPasswordData) => Promise<SignResponse>;
	resetPasswordRequest: (
		variables: ResetPasswordRequestData
	) => Promise<SignResponse>;
	resetPassword: (variables: ResetPasswordData) => Promise<SignResponse>;
	resetEmailRequest: (
		variables: ResetEmailRequestData
	) => Promise<SignResponse>;
	resetEmail: (variables: ResetEmailData) => Promise<SignResponse>;
	verifyEmailRequest: (
		variables: VerifyEmailRequestData
	) => Promise<SignResponse>;
	verifyEmail: (variables: VerifyEmailData) => Promise<SignResponse>;
	updateSelf: (variables: UpdateSelfData) => Promise<SignResponse>;
	markNotificationsRead: () => void;
	signOut: () => void;
	user: User | null;
	token?: string;
}

export const AuthContext = createContext<AuthContextType>({
	isSigned: false,
	isLoading: true,
	signIn: async () => ({success: false, errors: ['?????????? ?????????? ????????.']}),
	signUp: async () => ({success: false, errors: ['?????????? ?????????? ????????.']}),
	signOut: () => {},
	forgotPassword: async () => ({
		success: false,
		errors: ['?????????? ?????????? ????????.'],
	}),
	resetPasswordRequest: async () => ({
		success: false,
		errors: ['?????????? ?????????? ????????.'],
	}),
	resetPassword: async () => ({
		success: false,
		errors: ['?????????? ?????????? ????????.'],
	}),
	resetEmailRequest: async () => ({
		success: false,
		errors: ['?????????? ?????????? ????????.'],
	}),
	resetEmail: async () => ({
		success: false,
		errors: ['?????????? ?????????? ????????.'],
	}),
	verifyEmailRequest: async () => ({
		success: false,
		errors: ['?????????? ?????????? ????????.'],
	}),
	verifyEmail: async () => ({
		success: false,
		errors: ['?????????? ?????????? ????????.'],
	}),
	updateSelf: async () => ({
		success: false,
		errors: ['?????????? ?????????? ????????.'],
	}),
	markNotificationsRead: () => {},
	user: null,
	token: undefined,
});
