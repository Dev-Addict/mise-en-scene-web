import React, {FC, useState} from 'react';

import {AnnouncementContext} from './announcement.context';
import {useAnnouncementsQuery} from '../../../hooks';

interface Props {
	filter?: {
		[key: string]: any;
	};
	my?: boolean;
}

export const AnnouncementProvider: FC<Props> = ({
	children,
	filter,
	my = false,
}) => {
	const [page, setPage] = useState(1);
	const [myPage, setMyPage] = useState(1);

	const {
		announcements,
		loading,
		results,
		myAnnouncements,
		myLoading,
		myResults,
	} = useAnnouncementsQuery(filter || {}, page, setPage, myPage, setMyPage);

	const loadMore = () => () =>
		my
			? myAnnouncements.length < (myResults || 0) &&
			  setMyPage((page) => page + 1)
			: announcements.length < (results || 0) && setPage((page) => page + 1);

	return (
		<AnnouncementContext.Provider
			value={{
				announcements: my ? myAnnouncements : announcements,
				loading: my ? myLoading : loading,
				loadMore: loadMore(),
				results: my ? myResults : results,
			}}>
			{children}
		</AnnouncementContext.Provider>
	);
};
