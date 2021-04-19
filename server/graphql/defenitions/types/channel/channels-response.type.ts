import {list, nonNull, objectType} from 'nexus';

import {Channel} from '../../models';

export const ChannelsResponse = objectType({
	name: 'ChannelsResponse',
	definition(t) {
		t.nonNull.int('results');
		t.nonNull.int('page');
		t.nonNull.int('limit');
		t.nonNull.field('docs', {type: nonNull(list(nonNull(Channel)))});
	},
});
