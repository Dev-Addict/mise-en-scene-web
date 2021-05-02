import React, {FC} from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import {Button, Row, Text} from '../../../shared';
import {Color} from '../../../../data';
import {Channel, Size} from '../../../../types';
import {ChannelPosts} from '../post';

const Container = styled.div`
	margin-bottom: 50px;
`;

const HeaderRow = styled(Row)`
	align-items: center;
	justify-content: space-between;
`;

interface Props {
	channel: Channel;
}

export const ManagerPosts: FC<Props> = ({channel}) => {
	return (
		<Container>
			<HeaderRow>
				<Link href={`/channels/${channel.handle}/manage/post`}>
					<Button
						primary
						type="button"
						color={Color.GHOST_WHITE}
						minWidth={150}>
						ساخت مطلب
					</Button>
				</Link>
				<Text size={Size.HUGE} text="مطالب" />
			</HeaderRow>
			<ChannelPosts channel={channel} />
		</Container>
	);
};
