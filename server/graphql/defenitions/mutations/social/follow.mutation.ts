import {arg, mutationField, nonNull} from 'nexus';

import {FollowData} from '../inputs';
import {UserFollow} from '../../models';
import {protect} from '../../../../utils';
import {NotificationType} from '../../../../../types';

export const FollowMutation = mutationField('follow', {
	type: nonNull(UserFollow),
	args: {
		data: arg({type: nonNull(FollowData)}),
	},
	async resolve(
		_root,
		{data: {following}},
		{req, models: {UserFollow, User, Notification}}
	) {
		const {id: follower} = (await protect(req, User))!;

		const followed = await UserFollow.findOne({follower, following});

		if (followed) return <any>followed;

		const userFollow = await UserFollow.create({follower, following});

		await Notification.create({
			to: following,
			type: NotificationType.FOLLOW,
			user: follower,
		});

		return <any>userFollow;
	},
});
