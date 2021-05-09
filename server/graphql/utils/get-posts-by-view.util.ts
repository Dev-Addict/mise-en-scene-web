import {Model} from 'mongoose';

import {IPost, IView} from '../../models';
import {PostSort} from '../../../types';
import {getPostsByIds} from './get-posts-by-ids.util';

export const getPostsByView = async (
	Post: Model<IPost>,
	View: Model<IView>,
	sort: PostSort,
	page = 1,
	limit = 10
) => {
	let viewStart: {[key: string]: any} | undefined;

	switch (sort) {
		case PostSort.VIEW_DAY:
			viewStart = {
				$gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
			};
			break;
		case PostSort.VIEW_WEEK:
			viewStart = {
				$gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
			};
			break;
		case PostSort.VIEW_MONTH:
			viewStart = {
				$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
			};
			break;
		case PostSort.RATING:
		default:
			viewStart = undefined;
	}

	const topView = await View.aggregate([
		{
			$match: {
				bot: false,
				timeSpent: {
					$gte: 60000,
				},
				ended: true,
				post: {
					$ne: null,
				},
				viewStart,
			},
		},
		{
			$group: {
				_id: '$post',
				view: {
					$sum: 1,
				},
			},
		},
	])
		.sort({rating: -1, ratings: -1})
		.limit(limit)
		.skip((page - 1) * limit);

	const total =
		(
			await View.aggregate([
				{
					$match: {
						bot: false,
						timeSpent: {
							$gte: 60000,
						},
						ended: true,
						post: {
							$ne: null,
						},
						viewStart,
					},
				},
				{
					$group: {
						_id: '$post',
						view: {
							$sum: 1,
						},
					},
				},
				{
					$count: 'total',
				},
			])
		)[0]?.total || 0;

	const posts = await getPostsByIds(
		Post,
		topView.map(({_id}: {_id: string}) => _id)
	);

	return {
		docs: posts,
		results: total,
		page,
		limit,
	};
};
