import {Model} from 'mongoose';

import {IChannel, IChannelAdmin, IUser} from '../../../models';
import {Request} from '../../../types';
import {ChannelAdminPermission} from '../../../../types';
import {AppError, protect} from '../../../utils';

interface Args {
	User: Model<IUser>;
	Channel: Model<IChannel>;
	ChannelAdmin: Model<IChannelAdmin>;
	req: Request;
	channel: string;
	permissions: ChannelAdminPermission[];
	admin: string;
}

export const addAdmin = async ({
	User,
	req,
	Channel,
	ChannelAdmin,
	admin: adminId,
	permissions,
	channel: channelId,
}: Args) => {
	const user = (await protect(req, User))!;
	const channel = await Channel.findById(channelId);

	if (!channel) throw new AppError('0xE000060', 404);

	const admin = await User.findById(adminId);

	if (!admin) throw new AppError('0xE000061', 404);

	if (channel.owner.toString() === user._id.toString())
		return ChannelAdmin.create({channel, user: admin._id, permissions});

	const adminUser = await ChannelAdmin.findOne({
		channel: channelId,
		user: user._id,
	});

	if (!adminUser) throw new AppError('0xE000062', 404);

	if (!adminUser.accepted) throw new AppError('0xE000063', 404);

	if (!adminUser.permissions.includes(ChannelAdminPermission.CREATE_NEW_ADMIN))
		throw new AppError('0xE000065', 404);

	if (
		permissions.every((permission) =>
			adminUser.permissions.includes(permission)
		)
	)
		throw new AppError('0xE000064', 404);

	return ChannelAdmin.create({channel, user: admin._id, permissions});
};
