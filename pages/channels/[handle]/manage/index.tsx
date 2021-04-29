import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import Cookie from 'js-cookie';

import {
	AdminFinder,
	Button,
	ChannelAdmins,
	ChannelDetail,
	ChannelPosts,
	Error,
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

const HeaderRow = styled(Row)`
	align-items: center;
	justify-content: space-between;
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
		return (
			<Error
				code={404}
				title="کانالی با این هندل وجود ندارد."
				setTheme={setTheme}
			/>
		);

	if (!localChannel.verified)
		return (
			<Error
				code={403}
				title="کانال هنوز تایید نشده است."
				setTheme={setTheme}
			/>
		);

	if (localChannel.owner !== user?.id && !localChannel.myAdmin)
		return (
			<Error
				code={403}
				title="شما اجازه دسترسی به این صفحه را ندارید!"
				setTheme={setTheme}
			/>
		);

	return (
		<div>
			<Meta title={`مدیدریت کانال ${localChannel.name}`} />
			<Header setTheme={setTheme} />
			<Body>
				<ChannelDetail channel={localChannel} />
				<Filler minHeight={30} />
				<Text size={Size.HUGE} text="مدیر ها" />
				<AdminFinder channel={localChannel} />
				<ChannelAdmins channel={localChannel} />
				<Filler minHeight={30} />
				<HeaderRow>
					<Link href={`/channels/${localChannel.handle}/manage/post`}>
						<Button
							primary
							type="button"
							color={Color.GHOST_WHITE}
							minWidth={120}>
							ساخت مطلب
						</Button>
					</Link>
					<Text size={Size.HUGE} text="مطالب" />
				</HeaderRow>
				<ChannelPosts channel={localChannel} />
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
