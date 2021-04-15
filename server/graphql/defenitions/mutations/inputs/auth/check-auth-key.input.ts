import {inputObjectType} from 'nexus';

import {AuthKeyScalar} from '../../../scalars';

export const CheckAuthKeyData = inputObjectType({
	name: 'CheckAuthKeyData',
	definition(t) {
		t.nonNull.field('authKey', {type: AuthKeyScalar});
	},
});
