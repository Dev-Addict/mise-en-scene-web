import {queryField} from 'nexus';

import {JSONScalar} from '../../scalars';
import {protect} from '../../../../utils';
import {IChannelAdmin} from '../../../../models';
import {ChannelsResponse} from '../../types';

export const OwnedChannelsQuery = queryField('ownedChannels', {
	type: ChannelsResponse,
	args: {
		page: 'Int',
		limit: 'Int',
		sort: JSONScalar,
		filter: JSONScalar,
	},
	async resolve(
		_root,
		{page, limit, sort, filter = {}},
		{req, models: {User, Channel, ChannelAdmin}}
	) {
		const {_id: user} = (await protect(req, User))!;

		const adminCases = await ChannelAdmin.find({user});

		const adminChannels = adminCases.map(({_id}: IChannelAdmin) => _id);

		filter = {
			...filter,
			$or: [
				{
					owner: user,
				},
				{
					_id: {
						$in: adminChannels,
					},
				},
			],
		};

		const skip = ((page || 1) - 1) * (limit || 10);

		const ownedChannels = await Channel.find(filter)
			.skip(skip)
			.limit(limit || 10)
			.sort(sort || '-createdAt');

		const count = await Channel.countDocuments(filter);

		return {
			docs: <any>ownedChannels,
			limit: limit || 10,
			page: page || 1,
			results: count,
		};
	},
});
