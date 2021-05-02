import {objectType} from 'nexus';

import {Channel} from './channel.model';
import {User} from '../user';

export const ChannelFollow = objectType({
	name: 'ChannelFollow',
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
			type: Channel,
			resolve({following}, _args, {models: {Channel}}) {
				return <any>Channel.findById(following);
			},
		});
	},
});
