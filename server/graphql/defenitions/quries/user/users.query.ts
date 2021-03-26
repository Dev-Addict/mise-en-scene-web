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
		sort: 'String',
		filter: JSONScalar,
	},
	resolve(_root, _args, {models: {User}}) {
		return <any>findModels<IUser>(User);
	},
});
