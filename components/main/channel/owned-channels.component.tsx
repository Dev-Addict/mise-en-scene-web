import React, {useRef} from 'react';
import styled, {useTheme} from 'styled-components';

import {useComponentSize, useOwnedChannels} from '../../../hooks';
import {Animation, Button, ChannelCard, Text} from '../../shared';
import {Size, Theme, ThemeMode} from '../../../types';
import {movieLoaderDark, movieLoaderLight} from '../../../assets';

const Container = styled.div`
	margin: 10px 0;
`;

interface ChannelsProps {
	itemPerView?: number;
}

const Channels = styled.div<ChannelsProps>`
	display: grid;
	grid-template-columns: ${({itemPerView}) =>
		new Array(itemPerView).fill('1fr').join(' ')};
`;

export const OwnedChannels = () => {
	const channelsContainerRef = useRef<HTMLDivElement>(null);

	const {mode} = useTheme() as Theme;

	const {channels, loading, loadMore, results} = useOwnedChannels();

	const {width} = useComponentSize(channelsContainerRef);

	const itemPerView = Math.floor(width / 200) || 1;
	const animationData =
		mode === ThemeMode.LIGHT ? movieLoaderLight : movieLoaderDark;

	const onLoadMoreClick = () => () => !loading && loadMore();

	const renderChannels = () =>
		channels.map((channel) => (
			<ChannelCard
				channel={channel}
				key={channel.id}
				width={width / itemPerView - 40}
			/>
		));

	return (
		<Container>
			<Channels itemPerView={itemPerView} ref={channelsContainerRef}>
				{renderChannels()}
			</Channels>
			{loading && (
				<div>
					<Animation data={animationData} />
					<Text size={Size.MASSIVE} center text="در حال بارگذاری کانال ها..." />
				</div>
			)}
			{!loading && !channels.length && (
				<Text
					size={Size.MASSIVE}
					center
					text="هنوز درخواست کانالی را ارسال نکرده اید!"
				/>
			)}
			{!!channels.length && channels.length !== results && (
				<Button
					outline
					disabled={!!loading}
					primary
					onClick={onLoadMoreClick()}>
					بارگذاری بیشتر
				</Button>
			)}
		</Container>
	);
};
