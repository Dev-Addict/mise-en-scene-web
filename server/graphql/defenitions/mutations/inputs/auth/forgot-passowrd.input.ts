import {inputObjectType} from 'nexus';

import {AuthKeyScalar} from '../../../scalars';

export const ForgotPasswordData = inputObjectType({
	name: 'ForgotPasswordData',
	definition(t) {
		t.nonNull.field('authKey', {type: AuthKeyScalar});
	},
});
