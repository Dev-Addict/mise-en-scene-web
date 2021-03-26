import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import Error from 'next/error';
import Cookie from 'js-cookie';

import {Header, User as UserDetail} from '../../components';
import {cookieParser} from '../../utils';
import {
	apolloClient,
	FIND_USER_QUERY,
	FindUserQueryData,
	FindUserQueryDataFindUser,
	FindUserQueryVariables,
} from '../../api';
import {Props} from '../../types';

interface InitialProps {
	user?: FindUserQueryDataFindUser;
}

const User: NextPage<Props & InitialProps, InitialProps> = ({
	setTheme,
	user,
}) => {
	const [userState, setUserState] = useState(user);

	useEffect(() => {
		setUserState(user);
	}, [user]);

	if (!userState) return <Error statusCode={404} title="User not found." />;

	return (
		<div>
			<Header setTheme={setTheme} />
			<UserDetail user={userState} setUser={setUserState} />
		</div>
	);
};

User.getInitialProps = async ({query: {username}, req}) => {
	let user: FindUserQueryDataFindUser | undefined;

	const token =
		cookieParser(req?.headers?.cookie || '')['auth-token'] ||
		Cookie.get('auth-token');

	try {
		const {data} = await apolloClient.query<
			FindUserQueryData,
			FindUserQueryVariables
		>({
			query: FIND_USER_QUERY,
			variables: {username: username as string},
			context: {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		});

		user = data.findUser;
	} catch (_) {}

	return {
		user,
	};
};

export default User;
