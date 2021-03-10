import {mutationField} from 'nexus';

import {User} from '../../models';
import {protect} from '../../../../utils';

export const SelfMutation = mutationField('self', {
	type: User,
	resolve(_root, _ars, {req, models: {User}}) {
		return <any>protect(req, User);
	},
});
