import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Error from 'next/error';
import styled from 'styled-components';
import Cookie from 'js-cookie';

import {Header, Meta, PostBody} from '../../../../../components';
import {findChannel} from '../../../../../helpers';
import {Channel, ChannelAdminPermission, Props} from '../../../../../types';
import {useAuth} from '../../../../../hooks';
import {cookieParser} from '../../../../../utils';

const Body = styled.div`
	margin: auto;
	padding: 10px;
	width: 700px;

	@media only screen and (max-width: 800px) {
		width: auto;
	}
`;

interface InitialProps {
	channel?: Channel;
}

const Post: NextPage<Props & InitialProps, InitialProps> = ({
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

	if (
		localChannel.myAdmin &&
		localChannel.myAdmin.permissions?.includes(ChannelAdminPermission.POST)
	)
		return (
			<Error statusCode={403} title="شما اجازه دسترسی به این صفحه را ندارید!" />
		);

	return (
		<div>
			<Meta title={`مدیدریت کانال ${localChannel.name}`} />
			<Header setTheme={setTheme} />
			<Body>
				<PostBody channel={localChannel} />
			</Body>
		</div>
	);
};

Post.getInitialProps = async ({query: {handle}, req}) => {
	const token =
		cookieParser(req?.headers?.cookie || '')['auth-token'] ||
		Cookie.get('auth-token');

	const channel = await findChannel(handle as string, token);

	return {
		channel,
	};
};

export default Post;
