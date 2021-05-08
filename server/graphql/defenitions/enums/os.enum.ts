import {enumType} from 'nexus';

import {OS} from '../../../../types';

export const OSEnum = enumType({
	name: 'OS',
	members: Object.values(OS),
});
