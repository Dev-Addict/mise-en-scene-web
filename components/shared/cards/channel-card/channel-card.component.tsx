import React, {FC, useEffect, useState} from 'react';
import styled, {css} from 'styled-components';

import {Channel, Size} from '../../../../types';
import {Cover} from '../../view';
import {Text} from '../../text.component';
import {Filler} from '../../flex.component';
import {useAuth} from '../../../../hooks';
import {ChannelCardOwnerActions} from './channel-card-owner-actions.component';
import {ChannelCardUnacceptedActions} from './channel-card-unaccepted-actions.component';

interface ContainerProps {
	verified?: boolean;
	exists?: boolean;
}

const Container = styled.div<ContainerProps>`
	margin: 10px;
	border-radius: 10px;
	border: 3px solid ${({theme: {error}}) => error};
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;

	${({verified, theme: {primary}}) =>
		verified &&
		css`
			border-color: ${primary};
		`}

	${({exists = true}) =>
		!exists &&
		css`
			display: none;
		`}
`;

interface Props {
	channel: Channel;
	width: number;
}

export const ChannelCard: FC<Props> = ({channel, width}) => {
	const {user} = useAuth();

	const [
		{verified, cover, name, handle, owner, myAdmin},
		setLocalChannel,
	] = useState(channel);

	const isOwnerOrAccepted = user?.id === owner || myAdmin?.accepted || false;

	const isOwnerOrAdmin = user?.id === owner || !!myAdmin || false;

	useEffect(() => {
		setLocalChannel(channel);
	}, [channel]);

	return (
		<Container verified={verified} exists={isOwnerOrAdmin}>
			<Cover
				src={`/image/channel/cover/${cover || 'default.svg'}`}
				size={150}
			/>
			<Text size={Size.HUGE} maxLines={1} width={width - 20} text={name} />
			<Text lowOpacity maxLines={1} width={width - 20} text={`@${handle}`} />
			<Filler />
			{isOwnerOrAccepted ? (
				<ChannelCardOwnerActions handle={handle} verified={verified} />
			) : (
				<ChannelCardUnacceptedActions
					channel={channel}
					setChannel={setLocalChannel}
				/>
			)}
		</Container>
	);
};
