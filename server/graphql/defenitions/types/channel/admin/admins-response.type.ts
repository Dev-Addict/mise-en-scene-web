import {list, nonNull, objectType} from 'nexus';

import {ChannelAdmin} from '../../../models';

export const ChannelAdminsResponse = objectType({
	name: 'ChannelAdminsResponse',
	definition(t) {
		t.nonNull.int('results');
		t.nonNull.int('page');
		t.nonNull.int('limit');
		t.nonNull.field('docs', {type: nonNull(list(nonNull(ChannelAdmin)))});
	},
});
