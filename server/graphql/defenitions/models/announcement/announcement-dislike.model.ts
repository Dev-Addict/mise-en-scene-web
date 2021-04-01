import {objectType} from 'nexus';
import {Announcement} from './announcement.model';
import {User} from '../user';

export const AnnouncementDislike = objectType({
	name: 'AnnouncementDislike',
	definition(t) {
		t.nonNull.id('id');
		t.nonNull.id('announcement');
		t.nonNull.field('announcementData', {
			type: Announcement,
			resolve({announcement}, _args, {models: {Announcement}}) {
				return Announcement.findById(announcement);
			},
		});
		t.nonNull.id('user');
		t.nonNull.field('userData', {
			type: User,
			resolve({user}, _args, {models: {User}}) {
				return User.findById(user);
			},
		});
	},
});
