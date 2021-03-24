import {objectType} from 'nexus';

import {User} from './user.model';

export const UserFollow = objectType({
	name: 'UserFollow',
	definition(t) {
		t.nonNull.id('id');
		t.nonNull.id('follower');
		t.nonNull.field('followerData', {
			type: User,
			resolve({follower}, _args, {models: {User}}) {
				return <any>User.findById(follower);
			},
		});
		t.nonNull.id('following');
		t.nonNull.field('followingData', {
			type: User,
			resolve({following}, _args, {models: {User}}) {
				return <any>User.findById(following);
			},
		});
	},
});
