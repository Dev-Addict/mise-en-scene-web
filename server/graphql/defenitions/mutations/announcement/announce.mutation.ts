import {mutationField, nonNull} from 'nexus';

import {Announcement} from '../../models';
import {AnnounceData} from '../inputs';
import {saveImage} from '../../../utils';
import {AppError, protect} from '../../../../utils';

export const AnnounceMutation = mutationField('announce', {
	type: Announcement,
	args: {
		data: nonNull(AnnounceData),
	},
	async resolve(
		_root,
		{data: {text, images, gif, poll, publishAt, reAnnouncement}},
		{models: {Announcement, AnnouncementPoll, Image, User}, req}
	) {
		if (!reAnnouncement && !text) throw new AppError('0xE00004A', 400);

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

		return <any>await Announcement.create({
			user,
			text,
			gif,
			images: imagesIds,
			poll: pollId,
			publishAt,
			publish: !publishAt,
			reAnnouncement,
		});
	},
});
