import {mutationField, nonNull} from 'nexus';

import {ChannelAdmin} from '../../../models';
import {AcceptAdminData} from '../../inputs';
import {protect} from '../../../../../utils';

export const AcceptAdminMutation = mutationField('acceptAdmin', {
	type: ChannelAdmin,
	args: {
		data: nonNull(AcceptAdminData),
	},
	async resolve(_root, {data: {channel}}, {req, models: {ChannelAdmin, User}}) {
		const user = (await protect(req, User))!;

		await ChannelAdmin.findOneAndUpdate(
			{channel, user: user.id},
			{accepted: true}
		);

		return <any>ChannelAdmin.findOne({channel, user: user.id});
	},
});
