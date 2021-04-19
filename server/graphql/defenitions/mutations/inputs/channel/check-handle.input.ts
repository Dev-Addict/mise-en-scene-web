import {inputObjectType} from 'nexus';

import {UsernameScalar} from '../../../scalars';

export const CheckHandleData = inputObjectType({
	name: 'CheckHandleData',
	definition(t) {
		t.nonNull.field('handle', {type: UsernameScalar});
	},
});
