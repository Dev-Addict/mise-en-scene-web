import {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import Cookie from 'js-cookie';

import {
	ANNOUNCEMENTS_QUERY,
	AnnouncementsQueryData,
	AnnouncementsQueryVariables,
} from '../api';
import {Announcement} from '../types';

export const useAnnouncementsQuery = (filter: {}, page: number) => {
	const [announcements, setAnnouncements] = useState<Announcement[]>([]);

	const token = Cookie.get('auth-token');

	const {data, loading, refetch} = useQuery<
		AnnouncementsQueryData,
		AnnouncementsQueryVariables
	>(ANNOUNCEMENTS_QUERY, {
		variables: {
			filter,
			page,
			sort: {publishedAt: -1, updatedAt: -1},
		},
		context: {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
		notifyOnNetworkStatusChange: true,
	});

	useEffect(() => {
		setAnnouncements([]);
	}, [filter]);

	useEffect(() => {
		if (
			data &&
			announcements[announcements.length - 1]?.id !==
				data.announcements.docs[data.announcements.docs.length - 1]?.id
		)
			setAnnouncements((announcements) => [
				...announcements,
				...data.announcements.docs,
			]);
	}, [data]);
	useEffect(() => {
		if (!loading && !announcements.length) refetch();
	}, [announcements]);

	return {
		loading,
		announcements,
		results: data?.announcements?.results,
	};
};
