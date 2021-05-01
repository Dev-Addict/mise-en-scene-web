import {nonNull, queryField} from 'nexus';

import {AppError, protect} from '../../../../utils';
import {findModels} from '../../../utils';
import {PostsResponse} from '../../types';

export const ChannelPostsQuery = queryField('channelPosts', {
	type: PostsResponse,
	args: {
		page: 'Int',
		limit: 'Int',
		channel: nonNull('ID'),
	},
	async resolve(
		_root,
		{page, limit, channel: channelId},
		{req, models: {User, Post, Channel, ChannelAdmin}}
	) {
		const user = (await protect(req, User))!;

		const channel = await Channel.findById(channelId);

		if (!channel) throw new AppError('0xE00007F', 404);

		const myAdmin = await ChannelAdmin.findOne({
			channel: channelId,
			user: user.id,
		});

		if (channel.owner.toString() !== user.id && !myAdmin)
			throw new AppError('0xE000080', 403);

		return <any>findModels(
			Post,
			page || 1,
			limit || 10,
			{_id: -1},
			{
				channel: channelId,
			}
		);
	},
});
