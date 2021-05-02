import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import Cookie from 'js-cookie';

import {
	AnnouncementProvider,
	ErrorPage,
	Header,
	Meta,
	User as UserDetail,
} from '../../components';
import {cookieParser} from '../../utils';
import {Props, User as UserModel} from '../../types';
import {findUser} from '../../helpers';
import {useUserDisplayName} from '../../hooks';

interface InitialProps {
	user?: UserModel;
}

const User: NextPage<Props & InitialProps, InitialProps> = ({
	setTheme,
	user,
}) => {
	const [userState, setUserState] = useState(user);

	const displayName = userState && useUserDisplayName(userState);

	useEffect(() => {
		setUserState(user);
	}, [user]);

	if (!userState)
		return <ErrorPage code={404} title="کاربر پیدا نشد!" setTheme={setTheme} />;

	return (
		<AnnouncementProvider
			filter={{user: userState.id, comment: {exists: false}}}>
			<div>
				<Meta title={`مشخصات ${displayName}`} />
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
