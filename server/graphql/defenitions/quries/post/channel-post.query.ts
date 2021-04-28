import {nonNull, queryField} from 'nexus';

import {AppError, protect} from '../../../../utils';
import {Post} from '../../models';

export const ChannelPostQuery = queryField('channelPost', {
	type: Post,
	args: {
		id: nonNull('ID'),
	},
	async resolve(
		_root,
		{id},
		{req, models: {User, Post, Channel, ChannelAdmin}}
	) {
		const user = (await protect(req, User))!;

		const post = await Post.findById(id);

		if (!post) throw new AppError('0xE000081', 404);

		const channel = await Channel.findById(post.channel);

		if (!channel) throw new AppError('0xE000082', 404);

		const myAdmin = await ChannelAdmin.findOne({
			channel: post.channel,
			user: user.id,
		});

		if (channel.owner.toString() !== user.id.toString() && !myAdmin)
			throw new AppError('0xE000083', 403);

		return <any>post;
	},
});
