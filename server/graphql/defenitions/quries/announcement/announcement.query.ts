import {nonNull, queryField} from 'nexus';

import {Announcement} from '../../models';

export const AnnouncementQuery = queryField('announcement', {
	type: Announcement,
	args: {
		id: nonNull('ID'),
	},
	resolve(_root, {id}, {models: {Announcement}}) {
		return <any>Announcement.findById(id);
	},
});
