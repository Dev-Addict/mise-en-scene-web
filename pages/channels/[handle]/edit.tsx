import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Cookie from 'js-cookie';
import styled from 'styled-components';

import {EditChannel, ErrorPage, Logo, Meta} from '../../../components';
import {useAppState, useAuth} from '../../../hooks';
import {Channel, Process, Props} from '../../../types';

import {findChannel} from '../../../helpers';

const Header = styled.div`
	padding: 10px 20px;
	margin-bottom: 40px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	direction: rtl;
`;

const Edit: NextPage<Props> = ({setTheme}) => {
	const router = useRouter();
	const {asPath} = router;
	const {handle} = router.query;

	const [channel, setChannel] = useState<Channel | undefined>(undefined);

	const {user, isSigned, isLoading} = useAuth();

	const {addProcess, removeProcess} = useAppState();

	useEffect(() => {
		const token = Cookie.get('auth-token');

		(async () => {
			addProcess(Process.CHANNEL);

			setChannel(await findChannel(handle as string, token));

			removeProcess(Process.CHANNEL);
		})();
	}, [handle]);

	useEffect(() => {
		if (!isSigned && !isLoading) router.push(`/sign?callback=${asPath}`);
	}, [isSigned, isLoading]);

	if (!channel)
		return (
			<ErrorPage
				code={404}
				title="کانالی با این هندل وجود ندارد."
				setTheme={setTheme}
			/>
		);

	if (!channel.verified)
		return (
			<ErrorPage
				code={403}
				title="کانال هنوز تایید نشده است."
				setTheme={setTheme}
			/>
		);

	if (channel.owner !== user?.id)
		return (
			<ErrorPage
				code={403}
				title="شما اجازه دسترسی به این صفحه را ندارید!"
				setTheme={setTheme}
			/>
		);

	return (
		<div>
			<Meta title="درخواست کانال" />
			<Header>
				<Logo />
			</Header>
			<EditChannel channel={channel} />
		</div>
	);
};

export default Edit;
