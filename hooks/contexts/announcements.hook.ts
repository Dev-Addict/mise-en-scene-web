import {useContext} from 'react';

import {AnnouncementContext} from '../../components';

export const useAnnouncements = () => useContext(AnnouncementContext);
