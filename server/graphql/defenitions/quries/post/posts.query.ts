import {queryField} from 'nexus';

import {JSONScalar} from '../../scalars';
import {PostsResponse} from '../../types';
import {PostSortEnum} from '../../enums';
import {getPosts} from '../../../utils';
import {PostSort} from '../../../../../types';

export const PostsQuery = queryField('posts', {
	type: PostsResponse,
	args: {
		page: 'Int',
		limit: 'Int',
		sort: PostSortEnum,
		filter: JSONScalar,
	},
	resolve(
		_root,
		{page, limit, sort, filter},
		{models: {Post, PostRating, View}}
	) {
		filter = filter || {};
		filter.published = true;

		return <any>(
			getPosts(
				Post,
				PostRating,
				View,
				sort as PostSort,
				filter,
				page || 1,
				limit || 10
			)
		);
	},
});
