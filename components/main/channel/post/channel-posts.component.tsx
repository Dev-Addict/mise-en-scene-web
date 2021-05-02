import React, {FC} from 'react';
import styled, {useTheme} from 'styled-components';

import {Channel, Size, Theme, ThemeMode} from '../../../../types';
import {useChannelPosts} from '../../../../hooks';
import {movieLoaderDark, movieLoaderLight} from '../../../../assets';
import {Animation, Button, ChannelPostCard, Text} from '../../../shared';

const Container = styled.div`
	margin: 10px 0;
`;

interface Props {
	channel: Channel;
}

export const ChannelPosts: FC<Props> = ({channel: {id}, channel}) => {
	const {posts, loadMore, loading, results, reload} = useChannelPosts(id || '');

	const {mode} = useTheme() as Theme;

	const animationData =
		mode === ThemeMode.LIGHT ? movieLoaderLight : movieLoaderDark;

	const onLoadMoreClick = () => () => !loading && loadMore();

	const renderPosts = () =>
		posts.map((post) => (
			<ChannelPostCard post={post} reload={reload} channel={channel} />
		));

	return (
		<Container>
			<div>{renderPosts()}</div>
			{loading && (
				<div>
					<Animation data={animationData} />
					<Text size={Size.MASSIVE} center text="در حال بارگذاری مطالب..." />
				</div>
			)}
			{!loading && !posts.length && (
				<Text size={Size.MASSIVE} center text="این کانال هیج مطلبی ندارد!" />
			)}
			{!!posts.length && posts.length !== results && (
				<Button
					outline
					primary
					onClick={onLoadMoreClick()}
					disabled={!!loading}>
					بارگذاری بیشتر
				</Button>
			)}
		</Container>
	);
};
