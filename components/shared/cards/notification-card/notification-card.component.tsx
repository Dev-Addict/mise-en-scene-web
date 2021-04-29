import React, {FC} from 'react';
import styled from 'styled-components';

import {Notification} from '../../../../types';
import {Avatar} from '../../view';
import {NotificationMessage} from './notification-message.component';

const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 10px;
	border-bottom: 2px solid ${({theme: {foreground}}) => foreground};
	margin-bottom: 10px;
`;

const MessageContainer = styled.div`
	flex: 1;
	margin-right: 10px;
	direction: rtl;
`;

interface Props {
	notification: Notification;
}

export const NotificationCard: FC<Props> = ({
	notification: {userData},
	notification,
}) => {
	return (
		<Container>
			<MessageContainer>
				<NotificationMessage notification={notification} />
			</MessageContainer>
			<Avatar user={userData || undefined} size={60} />
		</Container>
	);
};
