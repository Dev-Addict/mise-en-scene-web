import {list, nonNull, objectType} from 'nexus';

import {Post} from '../../models';

export const PostsResponse = objectType({
	name: 'PostsResponse',
	definition(t) {
		t.nonNull.int('results');
		t.nonNull.int('page');
		t.nonNull.int('limit');
		t.nonNull.field('docs', {type: nonNull(list(nonNull(Post)))});
	},
});
