import {nonNull, queryField} from 'nexus';

import {User} from '../../models';
import {protect} from '../../../../utils';

export const SelfQuery = queryField('self', {
	type: nonNull(User),
	resolve(_root, _ars, {req, models: {User}}) {
		return <any>protect(req, User);
	},
});
