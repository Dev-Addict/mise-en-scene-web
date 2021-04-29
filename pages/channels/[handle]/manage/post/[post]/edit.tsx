import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Cookie from 'js-cookie';
import styled from 'styled-components';

import {
	Channel,
	ChannelAdminPermission,
	Post,
	Props,
} from '../../../../../../types';
import {useAuth} from '../../../../../../hooks';
import {EditPost, Error, Header, Meta} from '../../../../../../components';
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
	post?: Post;
}

const Edit: NextPage<Props & InitialProps, InitialProps> = ({
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
			<Error
				code={404}
				title="کانالی با این هندل وجود ندارد."
				setTheme={setTheme}
			/>
		);

	if (!localPost)
		return <Error code={404} title="مطلب پیدا نشد." setTheme={setTheme} />;

	if (!localChannel.verified)
		return (
			<Error
				code={403}
				title="کانال هنوز تایید نشده است."
				setTheme={setTheme}
			/>
		);

	if (
		localChannel.owner !== user?.id &&
		!(
			localChannel.myAdmin &&
			localChannel.myAdmin?.permissions?.includes(
				ChannelAdminPermission.EDIT_OTHERS_POST
			)
		) &&
		post?.adminData?.id !== user?.id
	)
		return (
			<Error
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
				<EditPost channel={localChannel} post={localPost} />
			</Body>
		</div>
	);
};

Edit.getInitialProps = async ({query: {handle, post: postId}, req}) => {
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

export default Edit;
