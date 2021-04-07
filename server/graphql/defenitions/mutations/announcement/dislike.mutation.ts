import {mutationField, nonNull} from 'nexus';

import {AnnouncementDislike} from '../../models';
import {protect} from '../../../../utils';

export const dislikeMutation = mutationField('dislike', {
	type: nonNull(AnnouncementDislike),
	args: {
		announcement: nonNull('ID'),
	},
	async resolve(
		_root,
		{announcement},
		{req, models: {User, AnnouncementDislike, AnnouncementLike}}
	) {
		const {id} = (await protect(req, User))!;

		await AnnouncementLike.findOneAndDelete({announcement, user: id});

		const announcementDislike = await AnnouncementDislike.findOne({
			announcement,
			user: id,
		});

		if (announcementDislike) {
			await AnnouncementDislike.findByIdAndDelete(announcementDislike.id);

			return <any>announcementDislike;
		}

		return <any>await AnnouncementDislike.create({announcement, user: id});
	},
});
