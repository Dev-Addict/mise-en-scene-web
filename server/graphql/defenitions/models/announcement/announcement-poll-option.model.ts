import {list, nonNull, objectType} from 'nexus';

import {AnnouncementPollResult} from './announcement-poll-result.model';

export const AnnouncementPollOption = objectType({
	name: 'AnnouncementPollOption',
	definition(t) {
		t.nonNull.id('poll');
		t.nonNull.int('index');
		t.nonNull.string('option');
		t.nonNull.int('votes', {
			resolve({poll, index}, _args, {models: {AnnouncementPollResult}}) {
				return AnnouncementPollResult.countDocuments({poll, option: index});
			},
		});
		t.nonNull.field('votesData', {
			type: list(nonNull(AnnouncementPollResult)),
			resolve({poll, index}, _args, {models: {AnnouncementPollResult}}) {
				return AnnouncementPollResult.find({poll, option: index});
			},
		});
	},
});
