import {inputObjectType} from 'nexus';

import {ChannelAdminPermissionEnum} from '../../../../enums';

export const AddAdminData = inputObjectType({
	name: 'AddAdminData',
	definition(t) {
		t.nonNull.id('admin');
		t.nonNull.id('channel');
		t.nonNull.list.nonNull.field('permissions', {
			type: ChannelAdminPermissionEnum,
		});
	},
});
