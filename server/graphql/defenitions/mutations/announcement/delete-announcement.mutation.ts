import {mutationField, nonNull} from 'nexus';

import {Announcement} from '../../models';
import {AppError, protect} from '../../../../utils';

export const DeleteAnnouncementMutation = mutationField('deleteAnnouncement', {
	type: Announcement,
	args: {
		id: nonNull('ID'),
	},
	async resolve(_root, {id}, {req, models: {User, Announcement}}) {
		const user = (await protect(req, User))!;

		const announcement = await Announcement.findById(id);

		if (announcement?.user === user.id) throw new AppError('0xE00007E', 403);

		return <any>Announcement.findByIdAndDelete(id);
	},
});
