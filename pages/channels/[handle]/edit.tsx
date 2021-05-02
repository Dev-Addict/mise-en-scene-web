import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import styled from 'styled-components';

import {EditChannel, ErrorPage, Logo, Meta} from '../../../components';
import {useAuth} from '../../../hooks';
import {Channel, Props} from '../../../types';
import {NextPage} from 'next';
import {cookieParser} from '../../../utils';
import Cookie from 'js-cookie';
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

interface InitialProps {
	channel?: Channel;
}

const Edit: NextPage<Props & InitialProps, InitialProps> = ({
	setTheme,
	channel,
}) => {
	const router = useRouter();
	const {asPath} = router;

	const [localChannel, setLocalChannel] = useState(channel);

	const {user, isSigned, isLoading} = useAuth();

	useEffect(() => {
		if (!isSigned && !isLoading) router.push(`/sign?callback=${asPath}`);
	}, [isSigned, isLoading]);

	useEffect(() => {
		setLocalChannel(channel);
	}, [channel]);

	if (!localChannel)
		return (
			<ErrorPage
				code={404}
				title="کانالی با این هندل وجود ندارد."
				setTheme={setTheme}
			/>
		);

	if (!localChannel.verified)
		return (
			<ErrorPage
				code={403}
				title="کانال هنوز تایید نشده است."
				setTheme={setTheme}
			/>
		);

	if (localChannel.owner !== user?.id)
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
			<EditChannel channel={localChannel} />
		</div>
	);
};

Edit.getInitialProps = async ({query: {handle}, req}) => {
	const token =
		cookieParser(req?.headers?.cookie || '')['auth-token'] ||
		Cookie.get('auth-token');

	const channel = await findChannel(handle as string, token);

	return {
		channel,
	};
};

export default Edit;
