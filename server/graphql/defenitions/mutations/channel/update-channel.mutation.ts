import {mutationField, nonNull} from 'nexus';

import {Channel} from '../../models';
import {UpdateChannelData} from '../inputs';
import {AppError, protect} from '../../../../utils';
import {saveCover} from '../../../utils';

export const UpdateChannelMutation = mutationField('updateChannel', {
	type: Channel,
	args: {
		id: nonNull('ID'),
		data: nonNull(UpdateChannelData),
	},
	async resolve(
		_root,
		{id, data: {cover, handle, name}},
		{req, models: {User, Channel}}
	) {
		const user = (await protect(req, User))!;

		const channel = await Channel.findById(id);

		if (!channel) throw new AppError('0xE000085', 404);

		if (channel.owner.toString() !== user._id.toString())
			throw new AppError('0xE000086', 403);

		let coverUrl = cover ? await saveCover(cover, 'channel/cover') : undefined;

		await Channel.findByIdAndUpdate(id, {
			cover: coverUrl,
			handle: handle || undefined,
			name: name || undefined,
		});

		return <any>Channel.findById(id);
	},
});
