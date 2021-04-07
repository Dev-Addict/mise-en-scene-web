import {queryField} from 'nexus';

import {JSONScalar} from '../../scalars';
import {findModels} from '../../../utils';
import {IAnnouncement} from '../../../../models';
import {AnnouncementsResponse} from '../../types';

export const AnnouncementsQuery = queryField('announcements', {
	type: AnnouncementsResponse,
	args: {
		page: 'Int',
		limit: 'Int',
		sort: JSONScalar,
		filter: JSONScalar,
	},
	resolve(_root, {page, limit, sort, filter}, {models: {Announcement}}) {
		filter = filter || {};
		filter.published = true;

		return <any>(
			findModels<IAnnouncement>(
				Announcement,
				page || 1,
				limit || 10,
				sort || '-publishedAt',
				filter
			)
		);
	},
});
