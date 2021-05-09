import React, {FC} from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import {Post, PostSort, Size} from '../../../types';
import {Posts, PostsScreenSlider} from '../post';
import {Button, Filler, Text} from '../../shared';
import {Color} from '../../../data';
import Link from 'next/link';
import {useThemeImage} from '../../../hooks';

const Body = styled.div`
	width: 700px;
	margin: 10px auto;

	@media only screen and (max-width: 800px) {
		width: auto;
		margin: 10px 20px;
	}
`;

const Conversations = styled.div`
	text-align: center;
`;

interface Props {
	topPosts: Post[];
	topDayViewPosts: Post[];
	topWeekViewPosts: Post[];
	topDayRatingPosts: Post[];
	topWeekRatingPosts: Post[];
	lastPosts: Post[];
}

export const HomeBody: FC<Props> = ({
	topPosts,
	topDayViewPosts,
	topWeekViewPosts,
	topDayRatingPosts,
	topWeekRatingPosts,
	lastPosts,
}) => {
	const opinion = useThemeImage(
		'/assets/illustrations/opinion/opinion-$mode.svg'
	);

	return (
		<>
			{!!topPosts.length && <PostsScreenSlider posts={topPosts} />}
			<Body>
				<Text size={Size.HUGE} text="پر بازدید ترین پست های روز" />
				<Posts posts={topDayViewPosts} />
				<Filler minHeight={10} />
				<Link href={{pathname: '/posts', query: {sort: PostSort.VIEW_DAY}}}>
					<Button primary circular color={Color.GHOST_WHITE}>
						ادامه
					</Button>
				</Link>
				<Filler minHeight={50} />
				<Text size={Size.HUGE} text="پر امتیاز ترین پست های روز" />
				<Posts posts={topDayRatingPosts} />
				<Filler minHeight={10} />
				<Link href={{pathname: '/posts', query: {sort: PostSort.RATING_DAY}}}>
					<Button primary circular color={Color.GHOST_WHITE}>
						ادامه
					</Button>
				</Link>
				<Filler minHeight={50} />
				<Image src={opinion} width={700} height={700} />
				<Conversations>
					<Text size={Size.MASSIVE} text="گفت و گو" />
					<Text
						size={Size.LARGE}
						text="نظرات خود را با ما به اشتراک بزارید و آغاز کننده یک گفت و گو باشید!"
					/>
					<Filler minHeight={20} />
					<Button primary circular outline>
						آغاز گفت و گو
					</Button>
				</Conversations>
				<Filler minHeight={50} />
				<Text size={Size.HUGE} text="پر بازدید ترین پست های هفته" />
				<Posts posts={topWeekViewPosts} />
				<Filler minHeight={10} />
				<Link href={{pathname: '/posts', query: {sort: PostSort.VIEW_WEEK}}}>
					<Button primary circular color={Color.GHOST_WHITE}>
						ادامه
					</Button>
				</Link>
				<Filler minHeight={50} />
				<Text size={Size.HUGE} text="پر امتیاز ترین پست های هفته" />
				<Posts posts={topWeekRatingPosts} />
				<Filler minHeight={10} />
				<Link href={{pathname: '/posts', query: {sort: PostSort.RATING_WEEK}}}>
					<Button primary circular color={Color.GHOST_WHITE}>
						ادامه
					</Button>
				</Link>
				<Filler minHeight={50} />
				<Text size={Size.HUGE} text="آخرین پست های انتشار شده" />
				<Posts posts={lastPosts} />
				<Filler minHeight={10} />
				<Link href={'/posts'}>
					<Button primary circular color={Color.GHOST_WHITE}>
						ادامه
					</Button>
				</Link>
				<Filler minHeight={50} />
			</Body>
		</>
	);
};
