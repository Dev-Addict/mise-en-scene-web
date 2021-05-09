import React, {FC} from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import {Post, Size} from '../../../../types';
import {BASE_URL} from '../../../../config';
import {Button, Cover, Rating, Row, Text} from '../../../shared';
import {useDate} from '../../../../hooks';
import {Color} from '../../../../data';

interface ContainerProps {
	background?: string;
}

const Container = styled.div<ContainerProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	background-color: ${({theme: {primary}}) => primary};
	background-image: url('${({background}) => background}');
	position: relative;
	cursor: pointer;
`;

const Details = styled.div`
	position: absolute;
	width: 80%;
	top: 30%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
`;

const BottomDetail = styled.div`
	position: absolute;
	width: 80%;
	bottom: 10px;
	left: 50%;
	transform: translateX(-50%);
	background-color: ${({theme: {background}}) => background};
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
	padding: 5px 10px;
	border-radius: 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const ChannelData = styled.div`
	position: absolute;
	top: 10px;
	right: 10px;
	direction: rtl;

	&,
	& * {
		transition: all 336ms;
	}
`;

const View = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	&,
	& * {
		transition: all 336ms !important;
	}
`;

interface Props {
	post: Post;
	active?: boolean;
}

export const PostItem: FC<Props> = ({
	post: {
		id,
		coverData,
		title,
		subtitle,
		rating,
		view,
		channelData,
		publishedAt,
	},
}) => {
	const time = useDate(publishedAt);

	return (
		<Link href={`/posts/${id}`}>
			<Container
				className="keen-slider__slide"
				background={`${BASE_URL}/image/${coverData?.directory}/${coverData?.image}`}>
				<Details className="details">
					<Text text={title} size={Size.HUGE} shadow />
					<Text text={subtitle || ''} size={Size.LARGE} shadow />
				</Details>
				<ChannelData>
					<Cover
						src={`/image/channel/cover/${channelData?.cover || 'default.svg'}`}
						size={60}
						link={`/channels/${channelData?.handle}`}
					/>
				</ChannelData>
				<BottomDetail>
					<Row>
						<Text size={Size.SMALL} text={time} />
						&nbsp;-&nbsp;
						<Text size={Size.SMALL} text={`${view || 0} بازدید`} />
					</Row>
					<Rating rating={rating} ratio={1.2} />
				</BottomDetail>
				<View>
					<Button primary color={Color.GHOST_WHITE} circular>
						خواندن مطلب
					</Button>
				</View>
			</Container>
		</Link>
	);
};
