import {mutationField, nonNull} from 'nexus';

import {RemoveAdminData} from '../../inputs';
import {ChannelAdmin} from '../../../models';
import {AppError, protect} from '../../../../../utils';
import {ChannelAdminPermission} from '../../../../../../types';

export const RemoveAdminMutation = mutationField('removeAdmin', {
	type: ChannelAdmin,
	args: {
		data: nonNull(RemoveAdminData),
	},
	async resolve(
		_root,
		{data: {channel: channelId, admin: adminId}},
		{req, models: {ChannelAdmin, Channel, User}}
	) {
		const user = (await protect(req, User))!;
		const channel = await Channel.findById(channelId);
		const myAdmin = await ChannelAdmin.findOne({
			channel: channelId,
			user: user.id,
		});
		const admin = await ChannelAdmin.findById(adminId);

		if (!channel) throw new AppError('0xE000066', 404);

		if (
			channel.owner !== user.id &&
			!myAdmin?.permissions?.includes(ChannelAdminPermission.DELETE_ADMIN) &&
			admin?.permissions?.includes(ChannelAdminPermission.DELETE_ADMIN)
		)
			throw new AppError('0xE000067', 403);

		return <any>ChannelAdmin.findByIdAndDelete(adminId);
	},
});
