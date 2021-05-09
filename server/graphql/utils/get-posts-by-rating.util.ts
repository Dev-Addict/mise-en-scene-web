import {Model} from 'mongoose';

import {IPost, IPostRating} from '../../models';
import {PostSort} from '../../../types';
import {getPostsByIds} from './get-posts-by-ids.util';

export const getPostsByRating = async (
	Post: Model<IPost>,
	PostRating: Model<IPostRating>,
	sort: PostSort,
	page = 1,
	limit = 10
) => {
	let ratedAt: {[key: string]: any};

	switch (sort) {
		case PostSort.RATING_DAY:
			ratedAt = {
				$gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
			};
			break;
		case PostSort.RATING_WEEK:
			ratedAt = {
				$gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
			};
			break;
		case PostSort.RATING_MONTH:
			ratedAt = {
				$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
			};
			break;
		case PostSort.RATING:
		default:
			ratedAt = {};
	}

	const topRating = await PostRating.aggregate([
		{
			$match: {ratedAt},
		},
		{
			$group: {
				_id: '$post',
				ratings: {
					$sum: 1,
				},
				rating: {
					$avg: '$rating',
				},
			},
		},
	])
		.sort({rating: -1, ratings: -1})
		.limit(limit)
		.skip((page - 1) * limit);

	const total =
		(
			await PostRating.aggregate([
				{
					$match: {ratedAt},
				},
				{
					$group: {
						_id: '$post',
						ratings: {
							$sum: 1,
						},
						rating: {
							$avg: '$rating',
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
		topRating.map(({_id}: {_id: string}) => _id)
	);

	return {
		docs: posts,
		results: total,
		page,
		limit
	};
};
