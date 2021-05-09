import {Model} from 'mongoose';

import {PostSort} from '../../../types';
import {IPost, IPostRating, IView} from '../../models';
import {findModels} from './find-models.util';
import {getPostsByRating} from './get-posts-by-rating.util';
import {getPostsByView} from './get-posts-by-view.util';

export const getPosts = async (
	Post: Model<IPost>,
	PostRating: Model<IPostRating>,
	View: Model<IView>,
	sort: PostSort,
	filter = {} as {[key: string]: any},
	page = 1,
	limit = 10
) => {
	switch (sort) {
		case PostSort.FIRST:
			return findModels(Post, page, limit, {publishedAt: 1}, filter);
		case PostSort.LAST:
			return findModels(Post, page, limit, {publishedAt: -1}, filter);
		case PostSort.RATING:
		case PostSort.RATING_DAY:
		case PostSort.RATING_WEEK:
		case PostSort.RATING_MONTH:
			return getPostsByRating(Post, PostRating, sort, page, limit);
		case PostSort.VIEW:
		case PostSort.VIEW_DAY:
		case PostSort.VIEW_WEEK:
		case PostSort.VIEW_MONTH:
			return getPostsByView(Post, View, sort, page, limit);
	}
};
