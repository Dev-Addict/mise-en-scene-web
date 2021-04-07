import {list, nonNull, objectType} from 'nexus';

import {
	DateScalar,
	EmailScalar,
	NameScalar,
	UsernameScalar,
} from '../../scalars';
import {GenderEnum} from '../../enums';
import {UserFollow} from './user-follow.model';
import {protect} from '../../../../utils';
import {Announcement} from '../announcement';

export const User = objectType({
	name: 'User',
	definition(t) {
		t.nonNull.id('id');
		t.field('firstname', {type: NameScalar});
		t.field('lastname', {type: NameScalar});
		t.nonNull.field('email', {type: EmailScalar});
		t.nonNull.string('avatar');
		t.field('birthday', {type: DateScalar});
		t.field('gender', {type: GenderEnum});
		t.nonNull.field('username', {type: UsernameScalar});
		t.string('bio');
		t.string('displayName');
		t.nonNull.int('followers', {
			resolve({id}, _args, {models: {UserFollow}}) {
				return UserFollow.countDocuments({following: id});
			},
		});
		t.nonNull.field('followersData', {
			type: UserFollow,
			resolve({id}, _args, {models: {UserFollow}}) {
				return <any>UserFollow.find({following: id});
			},
		});
		t.nonNull.int('followings', {
			resolve({id}, _args, {models: {UserFollow}}) {
				return UserFollow.countDocuments({follower: id});
			},
		});
		t.nonNull.field('followingsData', {
			type: UserFollow,
			resolve({id}, _args, {models: {UserFollow}}) {
				return <any>UserFollow.find({follower: id});
			},
		});
		t.nonNull.boolean('isFollowed', {
			async resolve({id}, _args, {req, models: {User, UserFollow}}) {
				const user = req.user || (await protect(req, User, false));

				return user
					? await UserFollow.exists({following: id, follower: user.id})
					: false;
			},
		});
		t.nonNull.int('announcements', {
			resolve({id}, _args, {models: {Announcement}}) {
				return Announcement.countDocuments({user: id});
			},
		});
		t.nonNull.field('announcementsData', {
			type: list(nonNull(Announcement)),
			resolve({id}, _args, {models: {Announcement}}) {
				return <any>Announcement.find({user: id});
			},
		});
	},
});
