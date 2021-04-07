import {mutationField, nonNull} from 'nexus';
import {AnnouncementLike} from '../../models';
import {protect} from '../../../../utils';

export const likeMutation = mutationField('like', {
	type: nonNull(AnnouncementLike),
	args: {
		announcement: nonNull('ID'),
	},
	async resolve(
		_root,
		{announcement},
		{req, models: {User, AnnouncementLike, AnnouncementDislike}}
	) {
		const {id} = (await protect(req, User))!;

		await AnnouncementDislike.findOneAndDelete({announcement, user: id});

		const announcementLike = await AnnouncementLike.findOne({
			announcement,
			user: id,
		});

		if (announcementLike) {
			await AnnouncementLike.findByIdAndDelete(announcementLike.id);

			return <any>announcementLike;
		}

		return <any>await AnnouncementLike.create({announcement, user: id});
	},
});
