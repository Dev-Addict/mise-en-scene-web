import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Error from 'next/error';
import styled from 'styled-components';

import {
	AdminFinder,
	ChannelAdmins,
	Header,
	Meta,
	Text,
} from '../../../../components';
import {findChannel} from '../../../../helpers';
import {Channel, Props, Size} from '../../../../types';
import {useAuth} from '../../../../hooks';
import {cookieParser} from '../../../../utils';
import Cookie from 'js-cookie';

const Body = styled.div`
	margin: auto auto 80px;
	padding: 10px;
	width: 700px;

	@media only screen and (max-width: 800px) {
		width: auto;
	}
`;

interface InitialProps {
	channel?: Channel;
}

const ManageChannel: NextPage<Props & InitialProps, InitialProps> = ({
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
		return <Error statusCode={404} title="کانالی با این هندل وجود ندارد." />;

	if (!localChannel.verified)
		return <Error statusCode={404} title="کانال هنوز تایید نشده است." />;

	return (
		<div>
			<Meta title={`مدیدریت کانال ${localChannel.name}`} />
			<Header setTheme={setTheme} />
			<Body>
				<Text size={Size.MASSIVE}>مدیر ها</Text>
				<AdminFinder
					admins={localChannel.admins}
					owner={localChannel.ownerData}
				/>
				<ChannelAdmins channel={localChannel} />
			</Body>
		</div>
	);
};

ManageChannel.getInitialProps = async ({query: {handle}, req}) => {
	const token =
		cookieParser(req?.headers?.cookie || '')['auth-token'] ||
		Cookie.get('auth-token');

	const channel = await findChannel(handle as string, token);

	return {
		channel,
	};
};

export default ManageChannel;
