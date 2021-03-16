import {createContext, FC, useEffect, useState} from 'react';
import Cookie from 'js-cookie';

import {
	apolloClient,
	SELF_QUERY,
	SIGN_IN_MUTATION,
	SIGN_UP_MUTATION,
} from '../api';

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
			message?: string;
	  };

export interface AuthContextType {
	isSigned: boolean;
	isLoading: boolean;
	signIn: (variables: SignInData) => Promise<SignResponse>;
	signUp: (variables: SignUpData) => Promise<SignResponse>;
	user: any;
}

export const AuthContext = createContext<AuthContextType>({
	isSigned: false,
	isLoading: true,
	signIn: async () => ({success: false, message: 'Not Initialized'}),
	signUp: async () => ({success: false, message: 'Not Initialized'}),
	user: null,
});

export const AuthProvider: FC = ({children}) => {
	const [user, setUser] = useState(null);
	const [isSigned, setSigned] = useState(false);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const loadUser = async () => {
			const token = Cookie.get('auth-token');

			if (token) {
				try {
					const {data} = await apolloClient.query({
						query: SELF_QUERY,
						context: {
							headers: {
								Authorization: `Bearer ${token}`,
							},
						},
					});

					setUser(data?.self);
					setSigned(true);
				} catch (error) {}
			}

			setLoading(false);
		};

		loadUser().then().catch();
	}, []);

	const signUp = async (variables: SignUpData) => {
		try {
			const {data} = await apolloClient.mutate({
				mutation: SIGN_UP_MUTATION,
				variables,
			});

			setUser(data?.signUp?.user);
			Cookie.set('auth-token', data?.signUp?.token);

			setSigned(true);

			return {
				success: true,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	};

	const signIn = async (variables: SignInData) => {
		try {
			const {data} = await apolloClient.mutate({
				mutation: SIGN_IN_MUTATION,
				variables,
			});

			setUser(data?.signIn?.user);
			Cookie.set('auth-token', data?.signIn?.token);

			setSigned(true);

			return {
				success: true,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	};

	return (
		<AuthContext.Provider value={{isSigned, isLoading, user, signIn, signUp}}>
			{children}
		</AuthContext.Provider>
	);
};
