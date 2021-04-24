import {mutationField, nonNull} from 'nexus';

import {addAdmin} from '../../../../utils';
import {ChannelAdmin} from '../../../models';
import {AddAdminData} from '../../inputs';
import {ChannelAdminPermission} from '../../../../../../types';

export const AddAdminMutation = mutationField('addAdmin', {
	type: nonNull(ChannelAdmin),
	args: {
		data: nonNull(AddAdminData),
	},
	resolve(
		_root,
		{data: {admin, permissions, channel}},
		{models: {ChannelAdmin, Channel, User}, req}
	) {
		return <any>addAdmin({
			Channel,
			ChannelAdmin,
			User,
			req,
			admin,
			channel,
			permissions: permissions as ChannelAdminPermission[],
		});
	},
});
