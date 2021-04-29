import {mutationField, nonNull} from 'nexus';

import {AnnouncementDislike} from '../../models';
import {AppError, protect} from '../../../../utils';
import {NotificationType} from '../../../../../types';

export const dislikeMutation = mutationField('dislike', {
	type: nonNull(AnnouncementDislike),
	args: {
		announcement: nonNull('ID'),
	},
	async resolve(
		_root,
		{announcement},
		{
			req,
			models: {
				User,
				AnnouncementDislike,
				AnnouncementLike,
				Notification,
				Announcement,
			},
		}
	) {
		const {id} = (await protect(req, User))!;

		const announcementData = await Announcement.findById(announcement);

		if (!announcementData) throw new AppError('0xE000084', 404);

		await AnnouncementLike.findOneAndDelete({announcement, user: id});

		const announcementDislike = await AnnouncementDislike.findOne({
			announcement,
			user: id,
		});

		if (announcementDislike) {
			await AnnouncementDislike.findByIdAndDelete(announcementDislike.id);

			return <any>announcementDislike;
		}

		const newAnnouncementDislike = await AnnouncementDislike.create({
			announcement,
			user: id,
		});

		if (announcementData.user.toString() !== id.toString())
			await Notification.create({
				to: announcementData.user,
				type: NotificationType.DISLIKE,
				announcement,
				user: id,
			});

		return <any>newAnnouncementDislike;
	},
});
