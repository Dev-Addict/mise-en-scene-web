import {objectType} from 'nexus';

import {UsernameScalar} from '../../scalars';
import {User} from '../user';
import {ChannelAdmin} from './channel-admin.model';
import {protect} from '../../../../utils';

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
			async resolve({id}, _args, {models: {ChannelAdmin}}) {
				return <any>ChannelAdmin.find({channel: id}).limit(1000);
			},
		});
		t.field('myAdmin', {
			type: ChannelAdmin,
			async resolve({id}, _args, {req, models: {ChannelAdmin, User}}) {
				const user = req.user || (await protect(req, User, false));

				return <any>ChannelAdmin.findOne({channel: id, user: user?.id});
			},
		});
	},
});
