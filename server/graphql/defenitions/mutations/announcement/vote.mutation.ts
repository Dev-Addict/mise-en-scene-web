import {mutationField, nonNull} from 'nexus';

import {AnnouncementPollResult} from '../../models';
import {VoteData} from '../inputs';
import {protect} from '../../../../utils';

export const voteMutation = mutationField('vote', {
	type: AnnouncementPollResult,
	args: {
		data: nonNull(VoteData),
	},
	async resolve(
		_root,
		{data: {poll, option}},
		{req, models: {User, AnnouncementPollResult}}
	) {
		const user = (await protect(req, User))!;

		const announcementPollResult = await AnnouncementPollResult.findOne({
			poll,
			user: user.id,
		});

		if (announcementPollResult) return <any>announcementPollResult;

		return AnnouncementPollResult.create({poll, user: user.id, option});
	},
});
