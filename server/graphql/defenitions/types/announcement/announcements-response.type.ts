import {list, nonNull, objectType} from 'nexus';

import {Announcement} from '../../models';

export const AnnouncementsResponse = objectType({
	name: 'AnnouncementsResponse',
	definition(t) {
		t.nonNull.int('results');
		t.nonNull.int('page');
		t.nonNull.int('limit');
		t.nonNull.field('docs', {type: nonNull(list(nonNull(Announcement)))});
	},
});
