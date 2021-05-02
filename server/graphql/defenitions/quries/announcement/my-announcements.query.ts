import {queryField} from 'nexus';

import {JSONScalar} from '../../scalars';
import {AnnouncementsResponse} from '../../types';
import {protect} from '../../../../utils';
import {IUserFollow} from '../../../../models';

export const MyAnnouncementsQuery = queryField('myAnnouncements', {
	type: AnnouncementsResponse,
	args: {
		page: 'Int',
		limit: 'Int',
		sort: JSONScalar,
		filter: JSONScalar,
	},
	async resolve(
		_root,
		{page, limit = 10, sort = {updatedAt: 1}, filter = {}},
		{req, models: {Announcement, User, UserFollow}}
	) {
		const user = (await protect(req, User))!;

		const users = await User.countDocuments();

		const followedUsers = await UserFollow.find({follower: user.id}).limit(
			users
		);

		const userIds = [
			...followedUsers.map(({following}: IUserFollow) => following),
			user._id,
		];

		const skip = ((page || 1) - 1) * (limit || 10);

		const announcements = await Announcement.find({
			...filter,
			user: userIds,
		})
			.skip(skip)
			.limit(limit || 10)
			.sort(sort || '-publishedAt');

		const total = (
			await Announcement.aggregate([
				{
					$match: {
						user: {
							$in: userIds,
						},
					},
				},
				{
					$group: {
						_id: null,
						total: {
							$sum: 1,
						},
					},
				},
			])
		)[0]?.total;

		return {
			docs: <any>announcements,
			limit: limit || 10,
			page: page || 1,
			results: total || 0,
		};
	},
});
