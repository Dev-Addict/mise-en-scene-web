import React, {Dispatch, FC, SetStateAction, useState} from 'react';

import {ChannelCardReject} from './channel-card-reject.component';
import {ChannelCardAccept} from './channel-card-accept.component';
import {Filler} from '../../flex.component';
import {Channel} from '../../../../types';

interface Props {
	channel: Channel;
	setChannel: Dispatch<SetStateAction<Channel>>;
}

export const ChannelCardUnacceptedActions: FC<Props> = ({
	channel,
	setChannel,
}) => {
	const [isLoading, setLoading] = useState(false);

	return (
		<>
			<ChannelCardAccept
				channel={channel}
				setChannel={setChannel}
				isLoading={isLoading}
				setLoading={setLoading}
			/>
			<Filler minHeight={10} />
			<ChannelCardReject
				channel={channel}
				setChannel={setChannel}
				isLoading={isLoading}
				setLoading={setLoading}
			/>
		</>
	);
};
