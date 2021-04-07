import React, {FC, useState} from 'react';

import {AnnouncementContext} from './announcement.context';
import {useAnnouncementsQuery} from '../../../hooks';

interface Props {
	filter?: {
		[key: string]: any;
	};
}

export const AnnouncementProvider: FC<Props> = ({children, filter}) => {
	const [page, setPage] = useState(1);

	const {announcements, loading, results} = useAnnouncementsQuery(
		filter || {},
		page
	);

	const loadMore = () => () =>
		announcements.length < (results || 0) && setPage((page) => page + 1);

	return (
		<AnnouncementContext.Provider
			value={{
				announcements,
				loading,
				loadMore: loadMore(),
				results,
			}}>
			{children}
		</AnnouncementContext.Provider>
	);
};
