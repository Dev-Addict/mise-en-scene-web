import {arg, mutationField, nonNull} from 'nexus';

import {ChannelFollowData} from '../inputs';
import {ChannelFollow} from '../../models';
import {protect} from '../../../../utils';

export const UnfollowChannelMutation = mutationField('unfollowChannel', {
	type: ChannelFollow,
	args: {
		data: arg({type: nonNull(ChannelFollowData)}),
	},
	async resolve(
		_root,
		{data: {following}},
		{req, models: {ChannelFollow, User}}
	) {
		const {id: follower} = (await protect(req, User))!;

		return <any>ChannelFollow.findOneAndDelete({follower, following});
	},
});
