import {inputObjectType} from 'nexus';

import {EmailScalar} from '../../../scalars';

export const VerifyEmailRequestData = inputObjectType({
	name: 'VerifyEmailRequestData',
	definition(t) {
		t.nonNull.field('email', {type: EmailScalar});
	},
});
