import {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import Cookie from 'js-cookie';

import {Notification} from '../../types';
import {
	MY_NOTIFICATIONS_QUERY,
	MyNotificationsQueryData,
	MyNotificationsQueryVariables,
} from '../../api';

export const useNotifications = () => {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [page, setPage] = useState(1);

	const token = Cookie.get('auth-token');

	const {data, loading, refetch} = useQuery<
		MyNotificationsQueryData,
		MyNotificationsQueryVariables
	>(MY_NOTIFICATIONS_QUERY, {
		variables: {
			page,
		},
		context: {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	});

	const loadMore = () => () => {
		setPage((page) => page + 1);
	};

	useEffect(() => {
		if (
			data &&
			notifications[notifications.length - 1]?.id !==
				data.myNotifications.docs[data.myNotifications.docs.length - 1]?.id
		)
			setNotifications((notifications) => [
				...notifications,
				...data.myNotifications.docs,
			]);
	}, [data, loading]);

	useEffect(() => {
		(async () => {
			if (!loading && !notifications.length && data?.myNotifications?.results) {
				setPage(1);
				setNotifications([]);
				await refetch();
			}
		})();
	}, [notifications, loading, data]);

	const reload = async () => {
		setPage(1);
		setNotifications([]);
		await refetch();
	};

	return {
		loading,
		notifications,
		loadMore: loadMore(),
		results: data?.myNotifications?.results,
		reload,
	};
};
