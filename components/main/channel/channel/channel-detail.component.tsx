import React, {Dispatch, FC, SetStateAction} from 'react';
import Link from 'next/link';

import {
	Container,
	Controls,
	Control,
	Detail,
} from './channel-detail-components.component';
import {Cover, FollowDetail, SpaceDivider, Text} from '../../../shared';
import {Channel, Size} from '../../../../types';
import {ChannelFollowControl} from './channel-follow-control.component';
import {useAuth} from '../../../../hooks';

interface Props {
	channel: Channel;
	setChannel: Dispatch<SetStateAction<Channel | undefined>>;
	manage?: boolean;
}

export const ChannelDetail: FC<Props> = ({
	channel: {cover, name, handle, owner, followers},
	manage,
	channel,
	setChannel,
}) => {
	const {user} = useAuth();

	return (
		<Container>
			<Cover
				src={`/image/channel/cover/${cover || 'default.svg'}`}
				size={150}
			/>
			<Detail>
				<Text size={Size.HUGE} maxLines={1} text={name} />
				<Text size={Size.BIG} lowOpacity maxLines={1} text={`@${handle}`} />
				<SpaceDivider size={Size.SMALL} />
				<FollowDetail showFollowings={false} followers={followers} />
				<SpaceDivider size={Size.SMALL} />
				<Controls>
					{manage ? (
						<>
							{user?.id === owner && (
								<Link href={`/channels/${handle}/edit`}>
									<Control primary circular outline>
										ویرایش
									</Control>
								</Link>
							)}
						</>
					) : (
						<ChannelFollowControl channel={channel} setChannel={setChannel} />
					)}
				</Controls>
				<SpaceDivider size={Size.TINY} />
			</Detail>
		</Container>
	);
};
