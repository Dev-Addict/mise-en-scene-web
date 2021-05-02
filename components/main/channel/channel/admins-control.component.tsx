import React, {FC} from 'react';
import styled from 'styled-components';

import {Text} from '../../../shared';
import {Channel, Size} from '../../../../types';
import {AdminFinder, ChannelAdmins} from '../admin';

const Container = styled.div`
	margin-bottom: 50px;
`;

interface Props {
	channel: Channel;
}

export const AdminsControl: FC<Props> = ({channel}) => {
	return (
		<Container>
			<Text size={Size.HUGE} text="مدیر ها" />
			<AdminFinder channel={channel} />
			<ChannelAdmins channel={channel} />
		</Container>
	);
};
