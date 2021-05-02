import React from 'react';
import {useTheme} from 'styled-components';

import {movieLoaderDark, movieLoaderLight} from '../../../assets';
import {Animation, PostCard, Button, Text} from '../../shared';
import {usePosts} from '../../../hooks';
import {Size, Theme, ThemeMode} from '../../../types';

export const Posts = () => {
	const {mode} = useTheme() as Theme;

	const {posts, loading, loadMore, results} = usePosts();

	const animationData =
		mode === ThemeMode.LIGHT ? movieLoaderLight : movieLoaderDark;

	const onLoadMoreClick = () => () => !loading && loadMore();

	const renderPosts = () => posts.map((post) => <PostCard post={post} />);

	return (
		<div>
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
		</div>
	);
};
