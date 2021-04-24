import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import Error from 'next/error';
import Cookie from 'js-cookie';

import {
	AnnouncementProvider,
	Header,
	User as UserDetail,
} from '../../components';
import {cookieParser} from '../../utils';
import {Props, User as UserModel} from '../../types';
import {findUser} from '../../helpers';

interface InitialProps {
	user?: UserModel;
}

const User: NextPage<Props & InitialProps, InitialProps> = ({
	setTheme,
	user,
}) => {
	const [userState, setUserState] = useState(user);

	useEffect(() => {
		setUserState(user);
	}, [user]);

	if (!userState) return <Error statusCode={404} title="کاربر پیدا نشد!" />;

	return (
		<AnnouncementProvider
			filter={{user: userState.id, comment: {exists: false}}}>
			<div>
				<Header setTheme={setTheme} />
				<UserDetail user={userState} setUser={setUserState} />
			</div>
		</AnnouncementProvider>
	);
};

User.getInitialProps = async ({query: {username}, req}) => {
	const token =
		cookieParser(req?.headers?.cookie || '')['auth-token'] ||
		Cookie.get('auth-token');

	const user = await findUser({username}, token);

	return {
		user,
	};
};

export default User;
