import {objectType} from 'nexus';
import {AnnouncementPoll} from './announcement-poll.model';
import {User} from '../user';

export const AnnouncementPollResult = objectType({
	name: 'AnnouncementPollResult',
	definition(t) {
		t.nonNull.id('id');
		t.nonNull.id('poll');
		t.nonNull.field('pollData', {
			type: AnnouncementPoll,
			resolve({poll}, _args, {models: {AnnouncementPoll}}) {
				return <any>AnnouncementPoll.findById(poll);
			},
		});
		t.nonNull.id('user');
		t.nonNull.field('userData', {
			type: User,
			resolve({user}, _args, {models: {User}}) {
				return <any>User.findById(user);
			},
		});
		t.nonNull.int('option');
	},
});
