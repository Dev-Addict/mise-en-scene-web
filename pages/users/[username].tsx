import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Cookie from 'js-cookie';

import {
	AnnouncementProvider,
	ErrorPage,
	Header,
	Meta,
	User as UserDetail,
} from '../../components';
import {Process, Props, User as UserModel} from '../../types';
import {findUser} from '../../helpers';
import {useAppState, useUserDisplayName} from '../../hooks';

const User: NextPage<Props> = ({setTheme}) => {
	const router = useRouter();
	const {username} = router.query;

	const [user, setUser] = useState<UserModel | undefined>(undefined);

	const displayName = user && useUserDisplayName(user);

	const {addProcess, removeProcess} = useAppState();

	useEffect(() => {
		const token = Cookie.get('auth-token');

		(async () => {
			addProcess(Process.USER);

			setUser(await findUser({username}, token));

			removeProcess(Process.USER);
		})();
	}, [username]);

	if (!user)
		return <ErrorPage code={404} title="کاربر پیدا نشد!" setTheme={setTheme} />;

	return (
		<AnnouncementProvider filter={{user: user.id, comment: {exists: false}}}>
			<div>
				<Meta title={`مشخصات ${displayName}`} />
				<Header setTheme={setTheme} />
				<UserDetail user={user} setUser={setUser} />
			</div>
		</AnnouncementProvider>
	);
};

export default User;
