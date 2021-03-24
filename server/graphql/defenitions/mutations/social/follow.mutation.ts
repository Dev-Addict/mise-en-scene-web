import {arg, mutationField, nonNull} from 'nexus';

import {FollowData} from '../inputs';
import {UserFollow} from '../../models';
import {protect} from '../../../../utils';

export const FollowMutation = mutationField('follow', {
	type: UserFollow,
	args: {
		data: arg({type: nonNull(FollowData)}),
	},
	async resolve(_root, {data: {following}}, {req, models: {UserFollow, User}}) {
		const {id: follower} = await protect(req, User);

		const followed = UserFollow.findOne({follower, following});

		if (followed) return <any>followed;
		return <any>UserFollow.create({follower, following});
	},
});
