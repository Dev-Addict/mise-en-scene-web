import React, {Dispatch, FC, SetStateAction} from 'react';
import styled from 'styled-components';

import {Channel, Post, Size} from '../../../../types';
import {Cover, Filler, Text} from '../../../shared';
import {ChannelFollowControl} from '../../channel/channel/channel-follow-control.component';

const Container = styled.div`
	border: 3px solid ${({theme: {foreground}}) => foreground};
	padding: 10px 0;
	border-radius: 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 20px 0;
	direction: rtl;

	& > * {
		margin: 0 10px;
	}

	@media only screen and (max-width: 600px) {
		flex-direction: column;
		padding: 0 10px;

		& > * {
			margin: 10px 0;
		}
	}
`;

const Detail = styled.div`
	@media only screen and (max-width: 600px) {
		text-align: center;
	}
`;

const Name = styled.div`
	display: flex;
	flex-direction: row;
	direction: rtl;
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}
`;

interface Props {
	channel: Channel;
	setPost: Dispatch<SetStateAction<Post | undefined>>;
}

export const PostChannel: FC<Props> = ({
	channel: {cover, name, handle, followers},
	channel,
	setPost,
}) => {
	const setChannel: Dispatch<SetStateAction<Channel | undefined>> = (value) => {
		if (typeof value === 'function')
			setPost((post) => ({
				...post,
				channelData: value(channel),
			}));
		else if (typeof value === 'object')
			setPost((post) => ({
				...post,
				channelData: value,
			}));
	};

	return (
		<Container>
			<Cover
				src={`/image/channel/cover/${cover || 'default.svg'}`}
				size={60}
				link={`/channels/${handle}`}
			/>
			<Detail>
				<Name>
					<Text text={name} rtl size={Size.LARGE} />
					<Text text="(" rtl size={Size.LARGE} />
					<Text text={`@${handle}`} lowOpacity size={Size.LARGE} />
					<Text text=")" rtl size={Size.LARGE} />
				</Name>
				<Text text={`${followers || 0} دنبال کننده`} size={Size.SMALL} />
			</Detail>
			<Filler />
			<div>
				<ChannelFollowControl channel={channel} setChannel={setChannel} />
			</div>
		</Container>
	);
};
