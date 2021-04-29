import {objectType} from 'nexus';
import {User} from '../user';
import {Post} from '../post';
import {NotificationTypeEnum} from '../../enums';

export const Notification = objectType({
	name: 'Notification',
	definition(t) {
		t.nonNull.id('id');
		t.nonNull.id('to');
		t.nonNull.field('toData', {
			type: User,
			resolve({to}, _args, {models: {User}}) {
				return <any>User.findById(to);
			},
		});
		t.nonNull.field('type', {
			type: NotificationTypeEnum,
		});
		t.id('user');
		t.field('userData', {
			type: User,
			resolve({user}, _args, {models: {User}}) {
				return <any>User.findById(user);
			},
		});
		t.id('announcement');
		t.field('announcementData', {
			type: User,
			resolve({announcement}, _args, {models: {Announcement}}) {
				return <any>Announcement.findById(announcement);
			},
		});
		t.id('post');
		t.field('postData', {
			type: Post,
			resolve({post}, _args, {models: {Post}}) {
				return <any>Post.findById(post);
			},
		});
		t.nonNull.boolean('seen');
	},
});
