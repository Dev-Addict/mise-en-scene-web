import {mutationField, nonNull} from 'nexus';

import {ChannelAdmin} from '../../../models';
import {EditAdminPermissionsData} from '../../inputs';
import {AppError, protect} from '../../../../../utils';
import {ChannelAdminPermission} from '../../../../../../types';

export const EditAdminPermissionsMutation = mutationField(
	'editAdminPermissions',
	{
		type: ChannelAdmin,
		args: {
			data: nonNull(EditAdminPermissionsData),
		},
		async resolve(
			_root,
			{data: {channel: channelId, admin: adminId, permissions}},
			{req, models: {ChannelAdmin, Channel, User}}
		) {
			const user = (await protect(req, User))!;
			const channel = await Channel.findById(channelId);
			const myAdmin = await ChannelAdmin.findOne({
				channel: channelId,
				user: user.id,
			});
			const admin = await ChannelAdmin.findById(adminId);

			if (!channel) throw new AppError('0xE000068', 404);

			if (
				channel.owner !== user.id &&
				!myAdmin?.permissions?.includes(
					ChannelAdminPermission.EDIT_ADMINS_PERMISSIONS
				) &&
				admin?.permissions?.includes(
					ChannelAdminPermission.EDIT_ADMINS_PERMISSIONS
				) &&
				!admin?.permissions?.every((permission: ChannelAdminPermission) =>
					myAdmin?.permissions?.includes(permission)
				)
			)
				throw new AppError('0xE000069', 403);

			if (admin) admin.permissions = permissions as any;
			await admin?.save();
			return <any>admin;
		},
	}
);
