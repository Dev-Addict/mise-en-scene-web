import {objectType} from 'nexus';

import {UsernameScalar} from '../../scalars';
import {User} from '../user';
import {ChannelAdmin} from './channel-admin.model';

export const Channel = objectType({
	name: 'Channel',
	definition(t) {
		t.nonNull.id('id');
		t.nonNull.field('handle', {type: UsernameScalar});
		t.nonNull.string('name');
		t.nonNull.id('owner');
		t.nonNull.field('ownerData', {
			type: User,
			resolve({owner}, _args, {models: {User}}) {
				return <any>User.findById(owner);
			},
		});
		t.nonNull.string('cover');
		t.nonNull.boolean('verified');
		t.nonNull.list.nonNull.field('admins', {
			type: ChannelAdmin,
			resolve({id}, _args, {models: {ChannelAdmin}}) {
				return <any>ChannelAdmin.find({id});
			},
		});
	},
});
