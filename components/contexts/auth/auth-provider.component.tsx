import React, {FC, useEffect, useState} from 'react';
import Cookie from 'js-cookie';

import {apolloClient, SELF_QUERY} from '../../../api';
import {AuthContext} from './auth.context';
import {
	forgotPassword,
	resetEmail,
	resetEmailRequest,
	resetPassword,
	resetPasswordRequest,
	signIn,
	signOut,
	signUp,
	updateSelf,
} from './helpers';
import {User} from '../../../types';

export const AuthProvider: FC = ({children}) => {
	const [user, setUser] = useState<User | null>(null);
	const [isSigned, setSigned] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const [token, setToken] = useState<string | undefined>(undefined);

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

					setToken(token);
					setUser(data?.self);
					setSigned(true);
				} catch (error) {}
			}

			setLoading(false);
		};

		loadUser().then().catch();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				forgotPassword: forgotPassword(),
				isLoading,
				isSigned,
				resetEmail: resetEmail({setUser, setSigned, setToken}),
				resetEmailRequest: resetEmailRequest(),
				resetPassword: resetPassword({setUser, setSigned, setToken}),
				resetPasswordRequest: resetPasswordRequest(),
				signIn: signIn({setUser, setSigned, setToken}),
				signOut: signOut({setUser, setSigned, setToken}),
				signUp: signUp({setUser, setSigned, setToken}),
				updateSelf: updateSelf({setUser, token}),
				token,
				user,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
