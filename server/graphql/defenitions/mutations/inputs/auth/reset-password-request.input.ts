import {inputObjectType} from 'nexus';

import {AuthKeyScalar} from '../../../scalars';

export const ResetPasswordRequestData = inputObjectType({
	name: 'ResetPasswordRequestData',
	definition(t) {
		t.nonNull.field('authKey', {type: AuthKeyScalar});
	},
});
