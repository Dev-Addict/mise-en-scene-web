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
	verifyEmail,
	verifyEmailRequest,
} from './helpers';
import {Process, User} from '../../../types';
import {useAppState} from '../../../hooks';

export const AuthProvider: FC = ({children}) => {
	const [user, setUser] = useState<User | null>(null);
	const [isSigned, setSigned] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const [token, setToken] = useState<string | undefined>(undefined);

	const {addProcess, removeProcess} = useAppState();

	useEffect(() => {
		(async () => {
			addProcess(Process.AUTH);

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

			removeProcess(Process.AUTH);
		})();
	}, []);

	const markNotificationsRead = () => () => {
		setUser((user) => user && {...user, notifications: 0});
	};

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
				verifyEmail: verifyEmail({setUser, setSigned, setToken}),
				verifyEmailRequest: verifyEmailRequest(),
				signIn: signIn({setUser, setSigned, setToken}),
				signOut: signOut({setUser, setSigned, setToken}),
				signUp: signUp({setUser, setSigned, setToken}),
				updateSelf: updateSelf({setUser, token}),
				markNotificationsRead: markNotificationsRead(),
				token,
				user,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
