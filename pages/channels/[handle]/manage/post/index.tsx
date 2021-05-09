import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import Cookie from 'js-cookie';

import {ErrorPage, Header, Meta, PostBody} from '../../../../../components';
import {findChannel} from '../../../../../helpers';
import {
	Channel,
	ChannelAdminPermission,
	Process,
	Props,
} from '../../../../../types';
import {useAppState, useAuth} from '../../../../../hooks';

const Body = styled.div`
	margin: auto;
	padding: 10px;
	width: 700px;

	@media only screen and (max-width: 800px) {
		width: auto;
	}
`;

const Post: NextPage<Props> = ({setTheme}) => {
	const router = useRouter();
	const {asPath} = router;
	const {handle} = router.query;

	const [channel, setChannel] = useState<Channel | undefined>(undefined);

	const {isSigned, isLoading, user} = useAuth();

	const {addProcess, removeProcess} = useAppState();

	useEffect(() => {
		const token = Cookie.get('auth-token');

		(async () => {
			addProcess(Process.CHANNEL);

			setChannel(await findChannel(handle as string, token));

			removeProcess(Process.CHANNEL);
		})();
	}, [handle]);

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

	if (!channel.verified)
		return (
			<ErrorPage
				code={404}
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

	if (
		channel.myAdmin &&
		channel.myAdmin.permissions?.includes(ChannelAdminPermission.POST)
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
			<Meta title={`مدیدریت کانال ${channel.name} - نوشتن مطب`} />
			<Header setTheme={setTheme} />
			<Body>
				<PostBody channel={channel} />
			</Body>
		</div>
	);
};

export default Post;
