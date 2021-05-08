import React from 'react';
import styled, {useTheme} from 'styled-components';

import {movieLoaderDark, movieLoaderLight} from '../../../assets';
import {Animation, PostCard, Button, Text} from '../../shared';
import {usePosts} from '../../../hooks';
import {Size, Theme, ThemeMode} from '../../../types';
import {AdInjector} from '../../shared/ads/ad-injector.component';

const Container = styled.div`
	margin-bottom: 80px;
`;

export const Posts = () => {
	const {mode} = useTheme() as Theme;

	const {posts, loading, loadMore, results} = usePosts();

	const animationData =
		mode === ThemeMode.LIGHT ? movieLoaderLight : movieLoaderDark;

	const onLoadMoreClick = () => () => !loading && loadMore();

	const renderPosts = () => (
		<AdInjector
			adId="pos-article-display-card-24145"
			items={posts.map((post) => (
				<PostCard post={post} key={post.id} />
			))}
		/>
	);

	return (
		<Container>
			{renderPosts()}
			{loading && (
				<div>
					<Animation data={animationData} />
					<Text size={Size.MASSIVE} center text="در حال بارگذاری گفت و گو..." />
				</div>
			)}
			{!loading && !posts.length && (
				<Text size={Size.MASSIVE} center text="هنوز پستی وجود ندارد!" />
			)}
			{!!posts.length && posts.length !== results && (
				<Button outline disabled={loading} primary onClick={onLoadMoreClick()}>
					بارگذاری بیشتر
				</Button>
			)}
		</Container>
	);
};
