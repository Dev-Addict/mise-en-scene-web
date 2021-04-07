import React from 'react';
import {useTheme} from 'styled-components';

import {movieLoaderDark, movieLoaderLight} from '../../../../assets';
import {Animation, AnnouncementCard, Text} from '../../../shared';
import {useAnnouncements} from '../../../../hooks';
import {Size, Theme, ThemeMode} from '../../../../types';

export const Announcements = () => {
	const {mode} = useTheme() as Theme;

	const {announcements, loading} = useAnnouncements();

	const animationData =
		mode === ThemeMode.LIGHT ? movieLoaderLight : movieLoaderDark;

	const renderAnnouncements = () =>
		announcements.map((announcement) => (
			<AnnouncementCard announcement={announcement} />
		));

	return (
		<div>
			{!loading && renderAnnouncements()}
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
		</div>
	);
};
