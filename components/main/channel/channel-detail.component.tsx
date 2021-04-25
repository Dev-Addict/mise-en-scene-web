import React, {FC} from 'react';
import styled from 'styled-components';

import {Cover, Text} from '../../shared';
import {Channel, Size} from '../../../types';

const Container = styled.div`
	display: flex;
	flex-direction: row;
	direction: rtl;
`;

const Detail = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 10px;
`;

interface Props {
	channel: Channel;
}

export const ChannelDetail: FC<Props> = ({channel: {cover, name, handle}}) => {
	return (
		<Container>
			<Cover src={`/image/channel/cover/${cover || 'default.svg'}`} />
			<Detail>
				<Text size={Size.HUGE}>{name}</Text>
				<Text size={Size.HUGE} lowOpacity>
					@{handle}
				</Text>
			</Detail>
		</Container>
	);
};
