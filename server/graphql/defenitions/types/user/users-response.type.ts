import {list, nonNull, objectType} from 'nexus';

import {User} from '../../models';

export const UsersResponse = objectType({
	name: 'UsersResponse',
	definition(t) {
		t.nonNull.int('results');
		t.nonNull.int('page');
		t.nonNull.int('limit');
		t.nonNull.field('docs', {type: nonNull(list(nonNull(User)))});
	},
});
