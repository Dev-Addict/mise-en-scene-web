import {mutationField, nonNull} from 'nexus';

import {Post} from '../../models';
import {UpdatePostData} from '../inputs';
import {AppError, protect} from '../../../../utils';
import {ChannelAdminPermission} from '../../../../../types';
import {saveJson} from '../../../utils';

export const UpdatePostMutation = mutationField('updatePost', {
	type: Post,
	args: {
		id: nonNull('ID'),
		data: nonNull(UpdatePostData),
	},
	async resolve(
		_root,
		{
			id,
			data: {
				body,
				cover,
				description,
				publishAt,
				published,
				subtitle,
				tags,
				title,
				...data
			},
		},
		{req, models: {Channel, ChannelAdmin, User, Post}}
	) {
		const user = (await protect(req, User))!;

		const post = await Post.findById(id);

		if (!post) throw new AppError('0xE000077', 404);

		const channel = await Channel.findById(post.channel);

		if (!channel) throw new AppError('0xE000076', 404);

		const admin = post.admin
			? await ChannelAdmin.findById(post.admin)
			: undefined;

		const myAdmin = await ChannelAdmin.findOne({
			user: user.id,
			channel: channel.id,
		});

		if (
			channel.owner.toString() !== user.id.toString() &&
			admin?.id?.toString() !== myAdmin?.id?.toString() &&
			!myAdmin?.permissions?.includes(ChannelAdminPermission.EDIT_OTHERS_POST)
		)
			throw new AppError('0xE000079', 403);

		const bodyUrl = body ? await saveJson(body, 'post') : undefined;

		await Post.findByIdAndUpdate(id, {
			...data,
			body: bodyUrl,
			cover: cover || undefined,
			description: description || undefined,
			publishAt: publishAt || undefined,
			subtitle: subtitle || undefined,
			tags: tags || undefined,
			title: title || undefined,
		});

		return <any>Post.findById(id);
	},
});
