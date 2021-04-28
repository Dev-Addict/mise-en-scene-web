import React, {FC} from 'react';
import styled from 'styled-components';

import {Channel, Post, Size} from '../../../../types';
import {Image} from '../../view';
import {Text} from '../../text.component';
import {ChannelPostCardActions} from './channel-post-card-actions.component';
import {useThemeImage} from '../../../../hooks';

const Container = styled.div``;

interface Props {
	post: Post;
	channel: Channel;
	reload: () => void;
}

export const ChannelPostCard: FC<Props> = ({
	post: {coverData, title, subtitle, description},
	post,
	channel,
	reload,
}) => {
	const logo = useThemeImage('/assets/logo/mes-$mode.svg');

	return (
		<Container>
			<Image image={coverData || undefined} defaultSrc={logo} />
			<Text size={Size.BIG} text={title} />
			<Text text={subtitle || undefined} />
			<Text text={description || undefined} size={Size.SMALL} lowOpacity />
			<ChannelPostCardActions post={post} channel={channel} reload={reload} />
		</Container>
	);
};
