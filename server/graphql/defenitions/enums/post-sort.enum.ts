import {enumType} from 'nexus';

import {PostSort} from '../../../../types';

export const PostSortEnum = enumType({
	name: 'PostSort',
	members: Object.values(PostSort),
});
