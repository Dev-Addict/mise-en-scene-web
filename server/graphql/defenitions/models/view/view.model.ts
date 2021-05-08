import {objectType} from 'nexus';

import {Channel} from '../channel';
import {DeviceEnum, OSEnum} from '../../enums';
import {User} from '../user';
import {DateScalar} from '../../scalars';
import {Post} from '../post';

export const View = objectType({
	name: 'View',
	definition(t) {
		t.nonNull.id('id');
		t.nonNull.boolean('authed');
		t.nonNull.boolean('bot');
		t.id('channel');
		t.field('channelData', {
			type: Channel,
			resolve({channel}, _args, {models: {Channel}}) {
				return <any>Channel.findById(channel);
			},
		});
		t.nonNull.string('city');
		t.nonNull.boolean('conversations');
		t.nonNull.string('country');
		t.nonNull.field('device', {type: DeviceEnum});
		t.nonNull.string('ip');
		t.nonNull.string('latitude');
		t.nonNull.string('longitude');
		t.nonNull.field('os', {type: OSEnum});
		t.nonNull.string('page');
		t.id('post');
		t.field('postData', {
			type: Post,
			resolve({post}, _args, {models: {Post}}) {
				return <any>Post.findById(post);
			},
		});
		t.nonNull.boolean('posts');
		t.nonNull.int('timeSpent');
		t.id('user');
		t.field('userData', {
			type: User,
			resolve({user}, _args, {models: {User}}) {
				return <any>User.findById(user);
			},
		});
		t.nonNull.string('version');
		t.nonNull.field('viewEnd', {type: DateScalar});
		t.nonNull.field('viewStart', {type: DateScalar});
		t.nonNull.boolean('ended');
	},
});
