import {arg, mutationField, nonNull} from 'nexus';

import {FollowData} from '../inputs';
import {UserFollow} from '../../models';
import {protect} from '../../../../utils';

export const UnfollowMutation = mutationField('unfollow', {
	type: UserFollow,
	args: {
		data: arg({type: nonNull(FollowData)}),
	},
	async resolve(_root, {data: {following}}, {req, models: {UserFollow, User}}) {
		const {id: follower} = (await protect(req, User))!;

		return <any>UserFollow.findOneAndDelete({follower, following});
	},
});
