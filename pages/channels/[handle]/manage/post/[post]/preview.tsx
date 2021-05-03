import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Cookie from 'js-cookie';
import styled from 'styled-components';

import {Channel, Post as PostModel, Props} from '../../../../../../types';
import {useAuth} from '../../../../../../hooks';
import {ErrorPage, Header, Meta, Post} from '../../../../../../components';
import {cookieParser} from '../../../../../../utils';
import {findChannel, getChannelPost} from '../../../../../../helpers';

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
	post?: PostModel;
}

const Preview: NextPage<Props & InitialProps, InitialProps> = ({
	setTheme,
	channel,
	post,
}) => {
	const router = useRouter();
	const {asPath} = router.query;

	const [localChannel, setLocalChannel] = useState(channel);
	const [localPost, setLocalPost] = useState(post);

	const {user, isLoading, isSigned} = useAuth();

	useEffect(() => {
		if (!isLoading && !isSigned) router.push(`/sign?callback=${asPath}`);
	}, [asPath, isSigned, isLoading]);

	useEffect(() => {
		setLocalChannel(channel);
	}, [channel]);

	useEffect(() => {
		setLocalPost(post);
	}, [post]);

	if (!localChannel)
		return (
			<ErrorPage
				code={404}
				title="کانالی با این هندل وجود ندارد."
				setTheme={setTheme}
			/>
		);

	if (!localPost)
		return <ErrorPage code={404} title="مطلب پیدا نشد." setTheme={setTheme} />;

	if (!localChannel.verified)
		return (
			<ErrorPage
				code={403}
				title="کانال هنوز تایید نشده است."
				setTheme={setTheme}
			/>
		);

	if (localChannel.owner !== user?.id && !localChannel.myAdmin)
		return (
			<ErrorPage
				code={403}
				title="شما اجازه دسترسی به این صفحه را ندارید!"
				setTheme={setTheme}
			/>
		);

	return (
		<div>
			<Meta title={`مدیدریت کانال ${localChannel.name} - ویرایش مطب`} />
			<Header setTheme={setTheme} />
			<Body>
				<Post post={localPost} setPost={setLocalPost} preview />
			</Body>
		</div>
	);
};

Preview.getInitialProps = async ({query: {handle, post: postId}, req}) => {
	const token =
		cookieParser(req?.headers?.cookie || '')['auth-token'] ||
		Cookie.get('auth-token');

	const channel = await findChannel(handle as string, token);
	const post = await getChannelPost(postId as string, token);

	return {
		channel,
		post,
	};
};

export default Preview;
