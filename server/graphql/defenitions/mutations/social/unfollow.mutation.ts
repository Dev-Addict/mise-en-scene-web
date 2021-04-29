import {arg, mutationField, nonNull} from 'nexus';

import {FollowData} from '../inputs';
import {UserFollow} from '../../models';
import {protect} from '../../../../utils';
import {NotificationType} from '../../../../../types';

export const UnfollowMutation = mutationField('unfollow', {
	type: UserFollow,
	args: {
		data: arg({type: nonNull(FollowData)}),
	},
	async resolve(
		_root,
		{data: {following}},
		{req, models: {UserFollow, User, Notification}}
	) {
		const {id: follower} = (await protect(req, User))!;

		const userFollow = await UserFollow.findOneAndDelete({follower, following});

		if (userFollow)
			await Notification.create({
				to: following,
				type: NotificationType.UNFOLLOW,
				user: follower,
			});

		return <any>userFollow;
	},
});
