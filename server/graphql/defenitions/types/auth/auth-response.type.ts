import {objectType} from 'nexus';

import {User} from '../../models';

export const AuthResponse = objectType({
	name: 'AuthResponse',
	definition(t) {
		t.nonNull.string('token');
		t.nonNull.field('user', {type: User});
	},
});
