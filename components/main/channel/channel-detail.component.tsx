import React, {FC} from 'react';
import styled from 'styled-components';

import {Cover, Filler, FollowDetail, Text} from '../../shared';
import {Channel, Size} from '../../../types';

const Container = styled.div`
	display: flex;
	flex-direction: row;
	direction: rtl;
	margin: 10px;

	@media only screen and (max-width: 500px) {
		flex-direction: column;
		align-items: center;
	}
`;

const Detail = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 10px;
	flex: 1;

	@media only screen and (max-width: 500px) {
		width: 100%;
	}
`;

interface Props {
	channel: Channel;
}

export const ChannelDetail: FC<Props> = ({channel: {cover, name, handle}}) => {
	return (
		<Container>
			<Cover src={`/image/channel/cover/${cover || 'default.svg'}`} />
			<Detail>
				<Text size={Size.HUGE} maxLines={1} text={name} />
				<Text size={Size.BIG} lowOpacity maxLines={1} text={`@${handle}`} />
				<Filler />
				<FollowDetail showFollowings={false} />
			</Detail>
		</Container>
	);
};
