import {createContext} from 'react';

import {User} from '../../../types';

export interface SignInData {
	authKey: string;
	password: string;
}

export interface SignUpData {
	email: string;
	username: string;
	password: string;
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
	user: User | null;
}

export const AuthContext = createContext<AuthContextType>({
	isSigned: false,
	isLoading: true,
	signIn: async () => ({success: false, errors: ['سیستم آماده نیست.']}),
	signUp: async () => ({success: false, errors: ['سیستم آماده نیست.']}),
	user: null,
});
