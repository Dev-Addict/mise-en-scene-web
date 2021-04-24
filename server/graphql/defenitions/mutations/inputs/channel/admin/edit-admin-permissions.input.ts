import {inputObjectType} from 'nexus';

import {ChannelAdminPermissionEnum} from '../../../../enums';

export const EditAdminPermissionsData = inputObjectType({
	name: 'EditAdminPermissionsData',
	definition(t) {
		t.nonNull.id('channel');
		t.nonNull.id('admin');
		t.nonNull.list.nonNull.field('permissions', {
			type: ChannelAdminPermissionEnum,
		});
	},
});
