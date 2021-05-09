import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import Cookie from 'js-cookie';

import {Footer, Header, HomeBody, Meta} from '../components';
import {Post, PostSort, Process, Props} from '../types';
import {getPosts, getTopPosts} from '../helpers';
import {useAppState} from '../hooks';

const Home: NextPage<Props> = ({setTheme}) => {
	const [topPosts, setTopPosts] = useState<Post[]>([]);
	const [topDayViewPosts, setTopDayViewPosts] = useState<Post[]>([]);
	const [topWeekViewPosts, setTopWeekViewPosts] = useState<Post[]>([]);
	const [topDayRatingPosts, setTopDayRatingPosts] = useState<Post[]>([]);
	const [topWeekRatingPosts, setTopWeekRatingPosts] = useState<Post[]>([]);
	const [lastPosts, setLastPosts] = useState<Post[]>([]);

	const {addProcess, removeProcess} = useAppState();

	useEffect(() => {
		const token = Cookie.get('auth-token');

		(async () => {
			addProcess(Process.HOME_PAGE);

			setTopPosts(await getTopPosts(token));
			setTopDayViewPosts(
				await getPosts(
					{
						limit: 5,
						sort: PostSort.VIEW_DAY,
					},
					token
				)
			);
			setTopWeekViewPosts(
				await getPosts(
					{
						limit: 5,
						sort: PostSort.VIEW_WEEK,
					},
					token
				)
			);
			setTopDayRatingPosts(
				await getPosts(
					{
						limit: 5,
						sort: PostSort.RATING_DAY,
					},
					token
				)
			);
			setTopWeekRatingPosts(
				await getPosts(
					{
						limit: 5,
						sort: PostSort.RATING_WEEK,
					},
					token
				)
			);
			setLastPosts(
				await getPosts(
					{
						limit: 5,
						sort: PostSort.LAST,
					},
					token
				)
			);

			removeProcess(Process.HOME_PAGE);
		})();
	}, []);

	return (
		<div>
			<Meta title="خانه" />
			<Header setTheme={setTheme} />
			<HomeBody
				topPosts={topPosts}
				topDayViewPosts={topDayViewPosts}
				topWeekViewPosts={topWeekViewPosts}
				topDayRatingPosts={topDayRatingPosts}
				topWeekRatingPosts={topWeekRatingPosts}
				lastPosts={lastPosts}
			/>
			<Footer />
		</div>
	);
};

export default Home;
