import {mutationField, nonNull} from 'nexus';

import {Post} from '../../models';
import {CreatePostData} from '../inputs';
import {AppError, protect} from '../../../../utils';
import {ChannelAdminPermission} from '../../../../../types';
import {saveJson} from '../../../utils';

export const CreatePostMutation = mutationField('createPost', {
	type: Post,
	args: {
		data: nonNull(CreatePostData),
	},
	async resolve(
		_root,
		{data: {channel: channelId, body, ...data}},
		{req, models: {Channel, ChannelAdmin, User, Post}}
	) {
		const user = (await protect(req, User))!;

		const channel = await Channel.findById(channelId);

		if (!channel) throw new AppError('0xE000074', 404);

		const admin = await ChannelAdmin.findOne({
			channel: channelId,
			user: user.id,
		});

		if (
			channel.owner.toString() !== user.id.toString() &&
			(!admin || !admin.permissions.includes(ChannelAdminPermission.POST))
		)
			throw new AppError('0xE000075', 403);

		const bodyUrl = await saveJson(body, 'post');

		return <any>Post.create({
			...data,
			channel: channelId,
			admin: admin?.id,
			body: bodyUrl,
		});
	},
});
