import {arg, mutationField, nonNull} from 'nexus';

import {ChannelFollowData} from '../inputs';
import {ChannelFollow} from '../../models';
import {protect} from '../../../../utils';

export const FollowChannelMutation = mutationField('followChannel', {
	type: nonNull(ChannelFollow),
	args: {
		data: arg({type: nonNull(ChannelFollowData)}),
	},
	async resolve(
		_root,
		{data: {following}},
		{req, models: {ChannelFollow, User}}
	) {
		const {id: follower} = (await protect(req, User))!;

		const followed = await ChannelFollow.findOne({follower, following});

		if (followed) return <any>followed;

		return <any>ChannelFollow.create({follower, following});
	},
});
