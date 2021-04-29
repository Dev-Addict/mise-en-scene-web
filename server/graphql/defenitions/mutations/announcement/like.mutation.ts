import {mutationField, nonNull} from 'nexus';
import {AnnouncementLike} from '../../models';
import {AppError, protect} from '../../../../utils';
import {NotificationType} from '../../../../../types';

export const likeMutation = mutationField('like', {
	type: nonNull(AnnouncementLike),
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
				AnnouncementLike,
				AnnouncementDislike,
				Announcement,
				Notification,
			},
		}
	) {
		const {id} = (await protect(req, User))!;

		const announcementData = await Announcement.findById(announcement);

		if (!announcementData) throw new AppError('0xE000084', 404);

		await AnnouncementDislike.findOneAndDelete({announcement, user: id});

		const announcementLike = await AnnouncementLike.findOne({
			announcement,
			user: id,
		});

		if (announcementLike) {
			await AnnouncementLike.findByIdAndDelete(announcementLike.id);

			return <any>announcementLike;
		}

		const newAnnouncementLike = await AnnouncementLike.create({
			announcement,
			user: id,
		});

		if (announcementData.user.toString() !== id.toString())
			await Notification.create({
				to: announcementData.user,
				type: NotificationType.LIKE,
				announcement,
				user: id,
			});

		return <any>newAnnouncementLike;
	},
});
