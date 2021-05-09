import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Cookie from 'js-cookie';
import styled from 'styled-components';

import {
	Channel,
	ChannelAdminPermission,
	Post,
	Process,
	Props,
} from '../../../../../../types';
import {useAppState, useAuth} from '../../../../../../hooks';
import {EditPost, ErrorPage, Header, Meta} from '../../../../../../components';
import {findChannel, getChannelPost} from '../../../../../../helpers';

const Body = styled.div`
	margin: auto;
	padding: 10px;
	width: 700px;

	@media only screen and (max-width: 800px) {
		width: auto;
	}
`;

const Edit: NextPage<Props> = ({setTheme}) => {
	const router = useRouter();
	const {asPath, handle, post: postId} = router.query;

	const [channel, setChannel] = useState<Channel | undefined>(undefined);
	const [post, setPost] = useState<Post | undefined>(undefined);

	const {user, isLoading, isSigned} = useAuth();

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

	useEffect(() => {
		if (!isLoading && !isSigned) router.push(`/sign?callback=${asPath}`);
	}, [asPath, isSigned, isLoading]);

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

	if (
		channel.owner !== user?.id &&
		!(
			channel.myAdmin &&
			channel.myAdmin?.permissions?.includes(
				ChannelAdminPermission.EDIT_OTHERS_POST
			)
		) &&
		post?.adminData?.id !== user?.id
	)
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
				<EditPost channel={channel} post={post} />
			</Body>
		</div>
	);
};

export default Edit;
