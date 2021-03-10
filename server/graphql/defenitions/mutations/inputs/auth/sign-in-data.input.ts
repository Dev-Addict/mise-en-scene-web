import {inputObjectType} from 'nexus';

import {AuthKeyScalar, PasswordScalar} from '../../../scalars';

export const SignInData = inputObjectType({
	name: 'SignInData',
	definition(t) {
		t.nonNull.field('authKey', {type: AuthKeyScalar});
		t.nonNull.field('password', {type: PasswordScalar});
	},
});
