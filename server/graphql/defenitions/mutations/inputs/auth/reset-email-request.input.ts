import {inputObjectType} from 'nexus';

import {EmailScalar} from '../../../scalars';

export const ResetEmailRequestData = inputObjectType({
	name: 'ResetEmailRequestData',
	definition(t) {
		t.nonNull.field('email', {type: EmailScalar});
	},
});
