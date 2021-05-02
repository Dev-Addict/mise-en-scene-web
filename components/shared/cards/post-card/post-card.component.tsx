import React, {FC} from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import {Post, Size} from '../../../../types';
import {Cover, Image, Rating} from '../../view';
import {Text} from '../../text.component';
import {useDate, useThemeImage} from '../../../../hooks';

const Container = styled.div`
	margin-bottom: 20px;
`;

const DetailContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

const Details = styled.div`
	flex: 1;
	margin-right: 10px;
`;

const Generics = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
`;

interface Props {
	post: Post;
}

export const PostCard: FC<Props> = ({
	post: {coverData, title, subtitle, channelData, id, publishedAt, rating},
}) => {
	const logo = useThemeImage('/assets/logo/mes-$mode.svg');

	const time = useDate(publishedAt);

	return (
		<Container>
			<Link href={`/posts/${id}`}>
				<Image image={coverData || undefined} defaultSrc={logo} active />
			</Link>
			<Generics>
				<Text size={Size.SMALL} text={time} />
				<Rating rating={rating} />
			</Generics>
			<DetailContainer>
				<Link href={`/posts/${id}`}>
					<Details>
						<Text size={Size.BIG} text={title} active />
						<Text text={subtitle || undefined} active />
					</Details>
				</Link>
				<Cover
					src={`/image/channel/cover/${channelData?.cover || 'default.svg'}`}
					size={60}
					link={`/channels/${channelData?.handle}`}
				/>
			</DetailContainer>
		</Container>
	);
};
