import {list, nonNull, objectType} from 'nexus';
import {AnnouncementPollOption} from './announcement-poll-option.model';
import {AnnouncementPollResult} from './announcement-poll-result.model';

export const AnnouncementPoll = objectType({
	name: 'AnnouncementPoll',
	definition(t) {
		t.nonNull.id('id');
		t.nonNull.string('question');
		t.nonNull.list.string('options');
		t.nonNull.field('optionsData', {
			type: list(nonNull(AnnouncementPollOption)),
			async resolve({options, id}) {
				const result = [];

				for (let i = 0; i < options.length; i++)
					result.push({
						poll: id,
						index: i,
						option: options[i],
					});

				return result;
			},
		});
		t.nonNull.int('votes', {
			async resolve({id}, _args, {models: {AnnouncementPollResult}}) {
				return AnnouncementPollResult.countDocuments({poll: id});
			},
		});
		t.nonNull.field('votesData', {
			type: list(nonNull(AnnouncementPollResult)),
			resolve({id}, _args, {models: {AnnouncementPollResult}}) {
				return AnnouncementPollResult.find({poll: id});
			},
		});
	},
});
