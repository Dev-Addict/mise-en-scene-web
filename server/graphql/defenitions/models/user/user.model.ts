import {objectType} from 'nexus';

import {
	DateScalar,
	EmailScalar,
	NameScalar,
	UsernameScalar,
} from '../../scalars';
import {GenderEnum} from '../../enums';
import {UserFollow} from './user-follow.model';

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
	},
});
