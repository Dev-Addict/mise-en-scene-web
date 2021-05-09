import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Cookie from 'js-cookie';
import styled from 'styled-components';

import {
	Channel,
	Post as PostModel,
	Process,
	Props,
} from '../../../../../../types';
import {useAppState, useAuth} from '../../../../../../hooks';
import {ErrorPage, Header, Meta, Post} from '../../../../../../components';
import {findChannel, getChannelPost} from '../../../../../../helpers';

const Body = styled.div`
	margin: auto;
	padding: 10px;
	width: 700px;

	@media only screen and (max-width: 800px) {
		width: auto;
	}
`;

const Preview: NextPage<Props> = ({setTheme}) => {
	const router = useRouter();
	const {asPath, handle, post: postId} = router.query;

	const [channel, setChannel] = useState<Channel | undefined>(undefined);
	const [post, setPost] = useState<PostModel | undefined>(undefined);

	const {user, isLoading, isSigned} = useAuth();

	useEffect(() => {
		if (!isLoading && !isSigned) router.push(`/sign?callback=${asPath}`);
	}, [asPath, isSigned, isLoading]);

	const {addProcess, removeProcess} = useAppState();

	useEffect(() => {
		const token = Cookie.get('auth-token');

		(async () => {
			addProcess(Process.CHANNEL);
			addProcess(Process.POST);

			setChannel(await findChannel(handle as string, token));
			setPost(await getChannelPost(postId as string, token));

			removeProcess(Process.POST);
			removeProcess(Process.CHANNEL);
		})();
	}, [handle, postId]);

	if (!channel)
		return (
			<ErrorPage
				code={404}
				title="کانالی با این هندل وجود ندارد."
				setTheme={setTheme}
			/>
		);

	if (!post)
		return <ErrorPage code={404} title="مطلب پیدا نشد." setTheme={setTheme} />;

	if (!channel.verified)
		return (
			<ErrorPage
				code={403}
				title="کانال هنوز تایید نشده است."
				setTheme={setTheme}
			/>
		);

	if (channel.owner !== user?.id && !channel.myAdmin)
		return (
			<ErrorPage
				code={403}
				title="شما اجازه دسترسی به این صفحه را ندارید!"
				setTheme={setTheme}
			/>
		);

	return (
		<div>
			<Meta title={`مدیدریت کانال ${channel.name} - ویرایش مطب`} />
			<Header setTheme={setTheme} />
			<Body>
				<Post post={post} setPost={setPost} preview />
			</Body>
		</div>
	);
};

export default Preview;
