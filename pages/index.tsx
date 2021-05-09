import React from 'react';
import {NextPage} from 'next';
import Cookie from 'js-cookie';

import {Footer, Header, HomeBody, Meta} from '../components';
import {Post, PostSort, Props} from '../types';
import {cookieParser} from '../utils';
import {getPosts, getTopPosts} from '../helpers';

interface InitialProps {
	topPosts: Post[];
	topDayViewPosts: Post[];
	topWeekViewPosts: Post[];
	topDayRatingPosts: Post[];
	topWeekRatingPosts: Post[];
	lastPosts: Post[];
}

const Home: NextPage<Props & InitialProps, InitialProps> = ({
	setTheme,
	...props
}) => {
	return (
		<div>
			<Meta title="خانه" />
			<Header setTheme={setTheme} />
			<HomeBody {...props} />
			<Footer />
		</div>
	);
};

Home.getInitialProps = async ({req}) => {
	const token =
		cookieParser(req?.headers?.cookie || '')['auth-token'] ||
		Cookie.get('auth-token');

	return {
		topPosts: await getTopPosts(token),
		topDayViewPosts: await getPosts(
			{
				limit: 5,
				sort: PostSort.VIEW_DAY,
			},
			token
		),
		topWeekViewPosts: await getPosts(
			{
				limit: 5,
				sort: PostSort.VIEW_WEEK,
			},
			token
		),
		topDayRatingPosts: await getPosts(
			{
				limit: 5,
				sort: PostSort.RATING_DAY,
			},
			token
		),
		topWeekRatingPosts: await getPosts(
			{
				limit: 5,
				sort: PostSort.RATING_WEEK,
			},
			token
		),
		lastPosts: await getPosts(
			{
				limit: 5,
				sort: PostSort.LAST,
			},
			token
		),
	};
};

export default Home;
