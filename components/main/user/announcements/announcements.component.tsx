import React from 'react';
import {useTheme} from 'styled-components';

import {movieLoaderDark, movieLoaderLight} from '../../../../assets';
import {Animation, AnnouncementCard, Button, Text} from '../../../shared';
import {useAnnouncements} from '../../../../hooks';
import {Size, Theme, ThemeMode} from '../../../../types';
import {Color} from '../../../../data';

export const Announcements = () => {
	const {mode} = useTheme() as Theme;

	const {announcements, loading, loadMore, results} = useAnnouncements();

	const animationData =
		mode === ThemeMode.LIGHT ? movieLoaderLight : movieLoaderDark;

	const renderAnnouncements = () =>
		announcements.map((announcement) => (
			<AnnouncementCard announcement={announcement} />
		));

	const onLoadMoreClick = () => () => !loading && loadMore();

	return (
		<div>
			{renderAnnouncements()}
			{loading && (
				<div>
					<Animation data={animationData} />
					<Text size={Size.MASSIVE} center>
						در حال بارگذاری گفت و گو...
					</Text>
				</div>
			)}
			{!loading && !announcements.length && (
				<Text size={Size.MASSIVE} center>
					هنوز پستی وجود ندارد!
				</Text>
			)}
			{!!announcements.length && announcements.length !== results && (
				<Button
					outline
					disabled={loading}
					primary
					color={Color.GHOST_WHITE}
					onClick={onLoadMoreClick()}>
					بارگذاری بیشتر
				</Button>
			)}
		</div>
	);
};
