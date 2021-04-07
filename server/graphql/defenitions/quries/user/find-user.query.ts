import {nonNull, queryField} from 'nexus';

import {User} from '../../models';
import {JSONScalar} from '../../scalars';

export const FindUserQuery = queryField('findUser', {
	type: User,
	args: {
		filter: nonNull(JSONScalar),
	},
	resolve(_root, {filter}, {models: {User}}) {
		return <any>User.findOne(filter);
	},
});
