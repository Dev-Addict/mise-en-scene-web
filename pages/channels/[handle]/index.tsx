import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import Cookie from 'js-cookie';

import {Channel, ErrorPage, Header, Meta} from '../../../components';
import {findChannel} from '../../../helpers';
import {Channel as ChannelModel, Process, Props} from '../../../types';
import {useAppState} from '../../../hooks';
import {useRouter} from 'next/router';

const ChannelPage: NextPage<Props> = ({setTheme}) => {
	const router = useRouter();
	const {handle} = router.query;

	const [channel, setChannel] = useState<ChannelModel | undefined>(undefined);

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

	return (
		<div>
			<Meta title={`کانال ${channel.name}`} />
			<Header setTheme={setTheme} />
			<Channel channel={channel} setChannel={setChannel} />
		</div>
	);
};

export default ChannelPage;
