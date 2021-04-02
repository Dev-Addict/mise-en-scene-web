import {inputObjectType} from 'nexus';

export const AnnouncementPollData = inputObjectType({
	name: 'AnnouncementPollData',
	definition(t) {
		t.nonNull.string('question');
		t.nonNull.list.nonNull.string('options');
	},
});
