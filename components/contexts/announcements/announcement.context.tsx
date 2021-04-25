import {createContext} from 'react';

import {Announcement} from '../../../types';

export interface AnnouncementContextType {
	announcements: Announcement[];
	loading: boolean;
	loadMore: () => void;
	reload: () => void;
	results?: number;
}

export const AnnouncementContext = createContext<AnnouncementContextType>({
	announcements: [],
	loading: true,
	loadMore: () => {},
	reload: () => {},
	results: undefined,
});
