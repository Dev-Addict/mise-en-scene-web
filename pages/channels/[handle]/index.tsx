import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Cookie from 'js-cookie';

import {Channel, ErrorPage, Header, Meta} from '../../../components';
import {findChannel} from '../../../helpers';
import {Channel as ChannelModel, Props} from '../../../types';
import {useAuth} from '../../../hooks';
import {cookieParser} from '../../../utils';

interface InitialProps {
	channel?: ChannelModel;
}

const ChannelPage: NextPage<Props & InitialProps, InitialProps> = ({
	setTheme,
	channel,
}) => {
	const router = useRouter();
	const {asPath} = router;

	const [localChannel, setLocalChannel] = useState(channel);

	const {isSigned, isLoading} = useAuth();

	useEffect(() => {
		if (!isLoading && !isSigned) router.push(`/sign?callback=${asPath}`);
	}, [asPath, isSigned, isLoading]);

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

	return (
		<div>
			<Meta title={`کانال ${localChannel.name}`} />
			<Header setTheme={setTheme} />
			<Channel channel={localChannel} setChannel={setLocalChannel} />
		</div>
	);
};

ChannelPage.getInitialProps = async ({query: {handle}, req}) => {
	const token =
		cookieParser(req?.headers?.cookie || '')['auth-token'] ||
		Cookie.get('auth-token');

	const channel = await findChannel(handle as string, token);

	return {
		channel,
	};
};

export default ChannelPage;
