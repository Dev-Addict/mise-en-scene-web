import React, {FC} from 'react';
import styled, {css, useTheme} from 'styled-components';

import {movieLoaderDark, movieLoaderLight} from '../../../assets';
import {AdInjector, Animation, PostCard, Button, Text} from '../../shared';
import {usePosts} from '../../../hooks';
import {Post, Size, Theme, ThemeMode} from '../../../types';

interface ContainerProps {
	space?: boolean;
}

const Container = styled.div<ContainerProps>`
	${({space = true}) =>
		space &&
		css`
			margin-bottom: 80px;
		`}
`;

interface Props {
	posts?: Post[];
}

export const Posts: FC<Props> = ({posts: outPosts}) => {
	const {mode} = useTheme() as Theme;

	const {posts, loading, loadMore, results} = usePosts();

	const animationData =
		mode === ThemeMode.LIGHT ? movieLoaderLight : movieLoaderDark;
	const localPosts = outPosts || posts;

	const onLoadMoreClick = () => () => !loading && loadMore();

	const renderPosts = () => (
		<AdInjector
			adId="pos-article-display-card-24145"
			items={localPosts.map((post) => (
				<PostCard post={post} key={post.id} />
			))}
		/>
	);

	return (
		<Container space={!outPosts}>
			{renderPosts()}
			{!outPosts && loading && (
				<div>
					<Animation data={animationData} />
					<Text size={Size.MASSIVE} center text="در حال بارگذاری گفت و گو..." />
				</div>
			)}
			{((!loading && !posts.length && !outPosts) ||
				(outPosts && !outPosts.length)) && (
				<Text size={Size.MASSIVE} center text="هنوز پستی وجود ندارد!" />
			)}
			{!!posts.length && posts.length !== results && !outPosts && (
				<Button outline disabled={loading} primary onClick={onLoadMoreClick()}>
					بارگذاری بیشتر
				</Button>
			)}
		</Container>
	);
};
