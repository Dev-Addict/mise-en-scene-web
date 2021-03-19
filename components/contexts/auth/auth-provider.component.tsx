import React, {FC, useEffect, useState} from 'react';
import Cookie from 'js-cookie';

import {apolloClient, SELF_QUERY} from '../../../api';
import {AuthContext} from './auth.context';
import {signIn, signUp} from './helpers';
import {User} from '../../../types';

export const AuthProvider: FC = ({children}) => {
	const [user, setUser] = useState<User | null>(null);
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

	return (
		<AuthContext.Provider
			value={{
				isSigned,
				isLoading,
				user,
				signIn: signIn({setUser, setSigned}),
				signUp: signUp({setUser, setSigned}),
			}}>
			{children}
		</AuthContext.Provider>
	);
};