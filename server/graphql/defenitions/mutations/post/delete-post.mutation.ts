import {mutationField, nonNull} from 'nexus';
import {Post} from '../../models';
import {AppError, protect} from '../../../../utils';
import {ChannelAdminPermission} from '../../../../../types';

export const DeletePostMutation = mutationField('deletePost', {
	type: Post,
	args: {
		id: nonNull('ID'),
	},
	async resolve(
		_root,
		{id},
		{req, models: {Post, Channel, ChannelAdmin, User}}
	) {
		const user = (await protect(req, User))!;

		const post = await Post.findById(id);

		if (!post) throw new AppError('0xE00007A', 404);

		const channel = await Channel.findById(post.channel);

		if (!channel) throw new AppError('0xE00007B', 404);

		const admin = await ChannelAdmin.findById(post.admin);

		if (!admin) throw new AppError('0xE00007C', 404);

		const myAdmin = await ChannelAdmin.findOne({
			channel: channel.id,
			user: user.id,
		});

		if (
			channel.owner.toString() !== user.id.toString() &&
			myAdmin?.id?.toString() !== admin.id.toString() &&
			!myAdmin?.permissions?.includes(ChannelAdminPermission.DELETE_POST)
		)
			throw new AppError('0xE00007D', 403);

		return <any>Post.findByIdAndDelete(id);
	},
});
