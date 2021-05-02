import {mutationField, nonNull} from 'nexus';

import {Announcement} from '../../models';
import {AnnounceData} from '../inputs';
import {saveImage} from '../../../utils';
import {AppError, protect} from '../../../../utils';
import {NotificationType} from '../../../../../types';

export const AnnounceMutation = mutationField('announce', {
	type: Announcement,
	args: {
		data: nonNull(AnnounceData),
	},
	async resolve(
		_root,
		{
			data: {
				text,
				images,
				gif,
				poll,
				publishAt,
				reAnnouncement,
				comment,
				reply,
			},
		},
		{models: {Announcement, AnnouncementPoll, Image, User, Notification}, req}
	) {
		if (!reAnnouncement && !text) throw new AppError('0xE00004A', 400);
		if (reAnnouncement && comment) throw new AppError('0xE000055', 400);
		if (comment && !text) throw new AppError('0xE000056', 400);
		if (reply && (comment || reAnnouncement))
			throw new AppError('0xE000090', 400);
		if (reply && !text) throw new AppError('0xE000091', 400);

		const {id: user} = (await protect(req, User))!;

		const imagesIds: string[] = [];
		let pollId: string | undefined = undefined;

		if (images)
			for (const image of images) {
				const {filename, width, height} = await saveImage(
					image,
					'announcement'
				);
				const {id} = await Image.create({
					image: filename,
					directory: 'announcement',
					width,
					height,
				});

				imagesIds.push(id);
			}

		if (poll) pollId = (await AnnouncementPoll.create(poll)).id;

		const announcement = await Announcement.create({
			user,
			text,
			gif,
			images: imagesIds,
			poll: pollId,
			publishAt,
			publish: !publishAt,
			reAnnouncement,
			comment,
			reply,
		});

		if (comment) {
			const toAnnouncement = await Announcement.findById(comment);

			if (user !== toAnnouncement?.user)
				await Notification.create({
					to: toAnnouncement?.user,
					type: NotificationType.COMMENT,
					announcement: comment,
					user,
				});
		}

		if (reAnnouncement) {
			const toAnnouncement = await Announcement.findById(reAnnouncement);

			if (user !== toAnnouncement?.user)
				await Notification.create({
					to: toAnnouncement?.user,
					type: NotificationType.RE_ANNOUNCEMENT,
					announcement: comment,
					user,
				});
		}

		return <any>announcement;
	},
});
