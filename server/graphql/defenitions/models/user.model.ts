import {objectType} from 'nexus';

import {DateScalar, EmailScalar, NameScalar, UsernameScalar} from '../scalars';
import {GenderEnum} from '../enums';

export const User = objectType({
	name: 'User',
	definition(t) {
		t.nonNull.id('id');
		t.field('firstname', {type: NameScalar});
		t.field('lastname', {type: NameScalar});
		t.nonNull.field('email', {type: EmailScalar});
		t.nonNull.string('avatar');
		t.field('birthday', {type: DateScalar});
		t.field('gender', {type: GenderEnum});
		t.nonNull.field('username', {type: UsernameScalar});
		t.string('bio');
		t.string('displayName');
	},
});
