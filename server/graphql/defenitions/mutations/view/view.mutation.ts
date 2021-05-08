import {mutationField, nonNull} from 'nexus';

import {View} from '../../models';
import {ViewData} from '../inputs';
import {UNKNOWN} from '../../../../../types';

export const ViewMutation = mutationField('view', {
	type: View,
	args: {
		data: nonNull(ViewData),
	},
	resolve(_root, {data}, {req, models: {View}}) {
		const {user, ...userDetail} = req.userDetail || {};
		return <any>View.create({
			...userDetail,
			...data,
			user: user === UNKNOWN ? undefined : user,
		});
	},
});
