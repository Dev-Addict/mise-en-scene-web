import {queryField} from 'nexus';

import {JSONScalar} from '../../scalars';
import {findModels} from '../../../utils';
import {IUser} from '../../../../models';
import {UsersResponse} from '../../types';

export const UsersQuery = queryField('users', {
	type: UsersResponse,
	args: {
		page: 'Int',
		limit: 'Int',
		sort: JSONScalar,
		filter: JSONScalar,
	},
	resolve(_root, {page, limit, sort, filter}, {models: {User}}) {
		return <any>(
			findModels<IUser>(
				User,
				page || 1,
				limit || 1,
				sort || '-createdAt',
				filter
			)
		);
	},
});
