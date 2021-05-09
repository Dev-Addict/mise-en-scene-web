import React, {FC} from 'react';
import {useTheme} from 'styled-components';

import {movieLoaderDark, movieLoaderLight} from '../../../../assets';
import {
	AdInjector,
	Animation,
	AnnouncementCard,
	Button,
	Text,
} from '../../../shared';
import {useAnnouncements} from '../../../../hooks';
import {Size, Theme, ThemeMode} from '../../../../types';

interface Props {
	reply?: boolean;
}

export const Announcements: FC<Props> = ({reply = true}) => {
	const {mode} = useTheme() as Theme;

	const {announcements, loading, loadMore, results} = useAnnouncements();

	const animationData =
		mode === ThemeMode.LIGHT ? movieLoaderLight : movieLoaderDark;

	const onLoadMoreClick = () => () => !loading && loadMore();

	const renderAnnouncements = () => (
		<AdInjector
			adId="pos-article-display-card-24062"
			items={announcements.map((announcement) => (
				<AnnouncementCard announcement={announcement} reply={reply} />
			))}
		/>
	);

	return (
		<div>
			{renderAnnouncements()}
			{loading && (
				<div>
					<Animation data={animationData} />
					<Text size={Size.MASSIVE} center text="در حال بارگذاری گفت و گو..." />
				</div>
			)}
			{!loading && !announcements.length && (
				<Text size={Size.MASSIVE} center text="هنوز گفت و گویی وجود ندارد!" />
			)}
			{!!announcements.length && announcements.length !== results && (
				<Button outline disabled={loading} primary onClick={onLoadMoreClick()}>
					بارگذاری بیشتر
				</Button>
			)}
		</div>
	);
};
