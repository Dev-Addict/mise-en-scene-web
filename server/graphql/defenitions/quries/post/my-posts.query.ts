import {queryField} from 'nexus';

import {JSONScalar} from '../../scalars';
import {PostsResponse} from '../../types';
import {protect} from '../../../../utils';
import {IChannelFollow} from '../../../../models';

export const MyPostsQuery = queryField('myPosts', {
	type: PostsResponse,
	args: {
		page: 'Int',
		limit: 'Int',
		sort: JSONScalar,
		filter: JSONScalar,
	},
	async resolve(
		_root,
		{page, limit = 10, sort = {updatedAt: 1}, filter = {}},
		{req, models: {Post, User, ChannelFollow, Channel}}
	) {
		const user = (await protect(req, User))!;

		const channels = await Channel.countDocuments();

		const followedChannelsIds = (
			await ChannelFollow.find({follower: user.id}).limit(channels)
		).map(({following}: IChannelFollow) => following);

		const skip = ((page || 1) - 1) * (limit || 10);

		const posts = await Post.find({
			...filter,
			channel: followedChannelsIds,
		})
			.skip(skip)
			.limit(limit || 10)
			.sort(sort || '-publishedAt');

		const total = (
			await Post.aggregate([
				{
					$match: {
						user: {
							$in: followedChannelsIds,
						},
					},
				},
				{
					$group: {
						_id: null,
						total: {
							$sum: 1,
						},
					},
				},
			])
		)[0]?.total;

		return {
			docs: <any>posts,
			limit: limit || 10,
			page: page || 1,
			results: total || 0,
		};
	},
});
