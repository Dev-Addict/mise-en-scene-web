import {enumType} from 'nexus';

import {ChannelAdminPermission} from '../../../../types';

export const ChannelAdminPermissionEnum = enumType({
	name: 'ChannelAdminPermission',
	members: Object.values(ChannelAdminPermission),
});
