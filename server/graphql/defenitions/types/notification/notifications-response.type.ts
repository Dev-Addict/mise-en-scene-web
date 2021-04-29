import {list, nonNull, objectType} from 'nexus';

import {Notification} from '../../models';

export const NotificationsResponse = objectType({
	name: 'NotificationsResponse',
	definition(t) {
		t.nonNull.int('results');
		t.nonNull.int('page');
		t.nonNull.int('limit');
		t.nonNull.field('docs', {type: nonNull(list(nonNull(Notification)))});
	},
});
