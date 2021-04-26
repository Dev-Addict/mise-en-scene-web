import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import Cookie from 'js-cookie';

import {
	ANNOUNCEMENTS_QUERY,
	AnnouncementsQueryData,
	AnnouncementsQueryVariables,
	MY_ANNOUNCEMENTS_QUERY,
	MyAnnouncementsQueryData,
	MyAnnouncementsQueryVariables,
} from '../../api';
import {Announcement} from '../../types';

export const useAnnouncementsQuery = (
	filter: {},
	page: number,
	setPage: Dispatch<SetStateAction<number>>,
	myPage: number,
	setMyPage: Dispatch<SetStateAction<number>>
) => {
	const [announcements, setAnnouncements] = useState<Announcement[]>([]);
	const [myAnnouncements, setMyAnnouncements] = useState<Announcement[]>([]);

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

	const {data: myData, loading: myLoading, refetch: myRefetch} = useQuery<
		MyAnnouncementsQueryData,
		MyAnnouncementsQueryVariables
	>(MY_ANNOUNCEMENTS_QUERY, {
		variables: {
			page: myPage,
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
		if (
			myData &&
			myAnnouncements[myAnnouncements.length - 1]?.id !==
				myData.myAnnouncements.docs[myData.myAnnouncements.docs.length - 1]?.id
		)
			setMyAnnouncements((announcements) => [
				...announcements,
				...myData.myAnnouncements.docs,
			]);
	}, [myData]);

	useEffect(() => {
		if (!loading && !announcements.length) {
			setPage(1);
			refetch();
		}
	}, [announcements]);

	useEffect(() => {
		if (!myLoading && !myAnnouncements.length) {
			setMyPage(1);
			myRefetch();
		}
	}, [myAnnouncements]);

	const reload = () => async () => {
		setPage(1);
		setMyPage(1);
		setAnnouncements([]);
		setMyAnnouncements([]);
		await refetch();
	};

	return {
		loading,
		announcements,
		results: data?.announcements?.results,
		myLoading,
		myAnnouncements,
		myResults: myData?.myAnnouncements?.results,
		reload: reload(),
	};
};
