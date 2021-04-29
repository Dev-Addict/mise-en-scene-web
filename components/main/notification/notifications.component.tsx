import React, {useEffect} from 'react';
import {useTheme} from 'styled-components';

import {useAuth, useNotifications} from '../../../hooks';
import {Size, Theme, ThemeMode} from '../../../types';
import {movieLoaderDark, movieLoaderLight} from '../../../assets';
import {Animation, Button, NotificationCard, Text} from '../../shared';

export const Notifications = () => {
	const {notifications, loadMore, loading, results} = useNotifications();

	const {mode} = useTheme() as Theme;

	const {markNotificationsRead, isSigned} = useAuth();

	const animationData =
		mode === ThemeMode.LIGHT ? movieLoaderLight : movieLoaderDark;

	const onLoadMoreClick = () => () => !loading && loadMore();

	useEffect(() => {
		markNotificationsRead();
	}, [isSigned]);

	const renderNotifications = () =>
		notifications.map((notification) => (
			<NotificationCard notification={notification} />
		));

	return (
		<div>
			<div>{renderNotifications()}</div>
			{loading && (
				<div>
					<Animation data={animationData} />
					<Text
						size={Size.MASSIVE}
						center
						text="در حال بارگذاری اطلاعیه ها..."
					/>
				</div>
			)}
			{!loading && !notifications.length && (
				<Text size={Size.MASSIVE} center text="شما هیچ اطلاعیه ای ندارید!" />
			)}
			{!!notifications.length && notifications.length !== results && (
				<Button outline disabled={loading} primary onClick={onLoadMoreClick()}>
					بارگذاری بیشتر
				</Button>
			)}
		</div>
	);
};
