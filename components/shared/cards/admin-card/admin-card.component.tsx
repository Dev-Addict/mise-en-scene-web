import React, {FC} from 'react';
import Link from 'next/link';
import styled, {css} from 'styled-components';

import {Avatar} from '../../view';
import {Text} from '../../text.component';
import {AdminCardActions} from './admin-card-actions.component';
import {Channel, ChannelAdmin, StyledProps} from '../../../../types';
import {useUserDisplayName} from '../../../../hooks';

interface ContainerProps {
	accepted?: boolean;
}

const Container = styled.div<StyledProps & ContainerProps>`
	padding: 10px;
	border-radius: 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin: 10px 0;
	border: 3px solid ${({theme: {foreground}}) => foreground};

	${({accepted = true}) =>
		!accepted &&
		css`
			border-color: ${({theme: {foreground}}) => foreground}80;
		`}
`;

interface Props {
	admin: ChannelAdmin;
	channel: Channel;
}

export const AdminCard: FC<Props> = ({
	admin: {userData, accepted},
	channel,
	admin,
}) => {
	const name = userData && useUserDisplayName(userData);

	return (
		<Container accepted={accepted}>
			<Avatar user={userData} size={50} />
			<Link href={`/users/${userData?.username || 'no'}`}>
				<Text maxLines={1} active>
					{name}
				</Text>
			</Link>
			<Link href={`/users/${userData?.username || 'no'}`}>
				<Text maxLines={1} lowOpacity active>
					@{userData?.username}
				</Text>
			</Link>
			<AdminCardActions channel={channel} admin={admin} />
		</Container>
	);
};
