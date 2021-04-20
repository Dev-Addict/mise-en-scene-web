import {objectType} from 'nexus';

import {Channel} from './channel.model';
import {User} from '../user';
import {ChannelAdminPermissionEnum} from '../../enums';

export const ChannelAdmin = objectType({
	name: 'ChannelAdmin',
	definition(t) {
		t.nonNull.id('id');
		t.nonNull.id('channel');
		t.nonNull.field('channelData', {
			type: Channel,
			resolve({channel}, _args, {models: {Channel}}) {
				return <any>Channel.findById(channel);
			},
		});
		t.nonNull.id('user');
		t.nonNull.field('userData', {
			type: User,
			resolve({user}, _args, {models: {User}}) {
				return <any>User.findById(user);
			},
		});
		t.nonNull.list.nonNull.field('permissions', {
			type: ChannelAdminPermissionEnum,
		});
		t.nonNull.boolean('accepted');
	},
});
