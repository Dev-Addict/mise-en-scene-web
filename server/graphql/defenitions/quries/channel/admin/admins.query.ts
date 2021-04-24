import {nonNull, queryField} from 'nexus';

import {JSONScalar} from '../../../scalars';
import {findModels} from '../../../../utils';
import {ChannelAdminsResponse} from '../../../types';

export const AdminsQuery = queryField('admins', {
	type: nonNull(ChannelAdminsResponse),
	args: {
		page: 'Int',
		limit: 'Int',
		sort: JSONScalar,
		filter: JSONScalar,
	},
	resolve(
		_root,
		{page, limit, sort = {createdAt: -1}, filter = {}},
		{models: {ChannelAdmin}}
	) {
		return <any>findModels(ChannelAdmin, page || 1, limit || 10, sort, filter);
	},
});
