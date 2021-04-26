import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Error from 'next/error';
import styled from 'styled-components';
import Cookie from 'js-cookie';

import {
	AdminFinder,
	Button,
	ChannelAdmins,
	ChannelDetail,
	Filler,
	Header,
	Meta,
	Row,
	Text,
} from '../../../../components';
import {findChannel} from '../../../../helpers';
import {Channel, Props, Size} from '../../../../types';
import {useAuth} from '../../../../hooks';
import {cookieParser} from '../../../../utils';
import {Color} from '../../../../data';

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

	const {isSigned, isLoading, user} = useAuth();

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

	if (localChannel.owner !== user?.id && !localChannel.myAdmin)
		return (
			<Error statusCode={403} title="شما اجازه دسترسی به این صفحه را ندارید!" />
		);

	return (
		<div>
			<Meta title={`مدیدریت کانال ${localChannel.name}`} />
			<Header setTheme={setTheme} />
			<Body>
				<ChannelDetail channel={localChannel} />
				<Filler minHeight={30} />
				<Text size={Size.HUGE}>مدیر ها</Text>
				<AdminFinder channel={localChannel} />
				<ChannelAdmins channel={localChannel} />
				<Filler minHeight={30} />
				<Row>
					<Link href={`/channels/${localChannel.handle}/manage/post`}>
						<Button circular primary color={Color.GHOST_WHITE} type="button">
							ساخت مطلب
						</Button>
					</Link>
					<Filler />
					<Text size={Size.HUGE}>مطالب</Text>
				</Row>
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
