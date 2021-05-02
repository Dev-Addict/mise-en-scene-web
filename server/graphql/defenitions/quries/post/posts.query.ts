import {queryField} from 'nexus';

import {JSONScalar} from '../../scalars';
import {findModels} from '../../../utils';
import {IPost} from '../../../../models';
import {PostsResponse} from '../../types';

export const PostsQuery = queryField('posts', {
	type: PostsResponse,
	args: {
		page: 'Int',
		limit: 'Int',
		sort: JSONScalar,
		filter: JSONScalar,
	},
	resolve(_root, {page, limit, sort, filter}, {models: {Post}}) {
		filter = filter || {};
		filter.published = true;

		return <any>(
			findModels<IPost>(
				Post,
				page || 1,
				limit || 10,
				sort || '-publishedAt',
				filter
			)
		);
	},
});
