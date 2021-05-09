import {list, nonNull, queryField} from 'nexus';

import {Post} from '../../models';
import {getPostsByIds} from '../../../utils';

export const TopPostsQuery = queryField('topPosts', {
	type: nonNull(list(nonNull(Post))),
	async resolve(_root, _args, {models: {Post, View, PostRating}}) {
		const posts: string[] = [];

		const topWeekView = await View.aggregate([
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
					viewStart: {
						$gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
					},
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
		]).sort({view: -1});

		const topDayView = await View.aggregate([
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
					viewStart: {
						$gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
					},
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
		]).sort({view: -1});

		const topWeekRating = await PostRating.aggregate([
			{
				$match: {
					ratedAt: {
						$gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
					},
				},
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
		]).sort({rating: -1, ratings: -1});

		const topDayRating = await PostRating.aggregate([
			{
				$match: {
					ratedAt: {
						$gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
					},
				},
			},
			{
				$group: {
					_id: '$post',
					rating: {
						$avg: '$rating',
					},
					ratings: {
						$sum: 1,
					},
				},
			},
		]).sort({rating: -1, ratings: -1});

		const topWeekViewPost = topWeekView[0]?._id;
		if (topWeekViewPost) posts.push(topWeekViewPost.toString());

		const topWeakRatingPost = topWeekRating.find(
			({_id}: {_id: string}) => !posts.includes(_id.toString())
		)?._id;
		if (topWeakRatingPost) posts.push(topWeakRatingPost.toString());

		const topDayViewPost = topDayView.find(
			({_id}: {_id: string}) => !posts.includes(_id.toString())
		)?._id;
		if (topDayViewPost) posts.push(topDayViewPost.toString());

		const topDayRatingPost = topDayRating.find(
			({_id}: {_id: string}) => !posts.includes(_id.toString())
		)?._id;
		if (topDayRatingPost) posts.push(topDayRatingPost.toString());

		return <any>getPostsByIds(Post, posts);
	},
});
