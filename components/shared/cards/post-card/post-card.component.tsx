import React, {FC} from 'react';
import Link from 'next/link';
import styled, {css} from 'styled-components';

import {Post, Size} from '../../../../types';
import {Cover, Image, Rating} from '../../view';
import {Text} from '../../text.component';
import {Row} from '../../flex.component';
import {useDate, useThemeImage} from '../../../../hooks';

interface ContainerProps {
	single?: boolean;
}

const Container = styled.div<ContainerProps>`
	padding: 10px 0;
	margin-bottom: 10px;
	border-bottom: 2px solid ${({theme: {foreground}}) => foreground}40;

	${({single = false}) =>
		single &&
		css`
			padding: 0;
			margin: 0;
			border: none;
		`}
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
	margin: -15px 0 10px 0;
`;

interface Props {
	post: Post;
	single?: boolean;
}

export const PostCard: FC<Props> = ({
	post: {
		view,
		coverData,
		title,
		subtitle,
		channelData,
		id,
		publishedAt,
		rating,
	},
	single = false,
}) => {
	const logo = useThemeImage('/assets/logo/mes-$mode.svg');

	const time = useDate(publishedAt);

	return (
		<Container single={single}>
			<Link href={`/posts/${id}`}>
				<div>
					<Image image={coverData || undefined} defaultSrc={logo} active />
				</div>
			</Link>
			<Generics>
				<Row>
					<Text size={Size.TINY} text={time} />
					&nbsp;-&nbsp;
					<Text size={Size.TINY} text={`${view || 0} بازدید`} />
				</Row>
				<Rating rating={rating} ratio={0.8} />
			</Generics>
			<DetailContainer>
				<Link href={`/posts/${id}`}>
					<Details>
						<Text size={Size.LARGE} text={title} active />
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
