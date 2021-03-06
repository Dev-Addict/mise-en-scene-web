import {nonNull, queryField} from 'nexus';

import {User} from '../../models';

export const UserByIdQuery = queryField('userById', {
	type: User,
	args: {
		id: nonNull('ID'),
	},
	resolve(_root, {id}, {models: {User}}) {
		return <any>User.findById(id);
	},
});
