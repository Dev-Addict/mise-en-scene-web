import {mutationField, nonNull} from 'nexus';

import {ChannelAdmin} from '../../../models';
import {RejectAdminData} from '../../inputs';
import {protect} from '../../../../../utils';

export const RejectAdminMutation = mutationField('rejectAdmin', {
	type: ChannelAdmin,
	args: {
		data: nonNull(RejectAdminData),
	},
	async resolve(_root, {data: {channel}}, {req, models: {ChannelAdmin, User}}) {
		const user = (await protect(req, User))!;

		return <any>ChannelAdmin.findOneAndDelete({channel, user: user.id});
	},
});
