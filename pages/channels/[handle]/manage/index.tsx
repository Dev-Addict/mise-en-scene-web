import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Cookie from 'js-cookie';

import {Channel, ErrorPage, Header, Meta} from '../../../../components';
import {findChannel} from '../../../../helpers';
import {Channel as ChannelModel, Process, Props} from '../../../../types';
import {useAppState, useAuth} from '../../../../hooks';

const ManageChannel: NextPage<Props> = ({setTheme}) => {
	const router = useRouter();
	const {asPath} = router;
	const {handle} = router.query;

	const [channel, setChannel] = useState<ChannelModel | undefined>(undefined);

	const {isSigned, isLoading, user} = useAuth();

	useEffect(() => {
		if (!isLoading && !isSigned) router.push(`/sign?callback=${asPath}`);
	}, [asPath, isSigned, isLoading]);

	const {addProcess, removeProcess} = useAppState();

	useEffect(() => {
		const token = Cookie.get('auth-token');

		(async () => {
			addProcess(Process.CHANNEL);

			setChannel(await findChannel(handle as string, token));

			removeProcess(Process.CHANNEL);
		})();
	}, [handle]);

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
			<Meta title={`مدیدریت کانال ${channel.name}`} />
			<Header setTheme={setTheme} />
			<Channel channel={channel} manage setChannel={setChannel} />
		</div>
	);
};

export default ManageChannel;
