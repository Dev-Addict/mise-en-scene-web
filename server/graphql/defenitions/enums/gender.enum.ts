import {enumType} from 'nexus';

import {Gender} from '../../../../types';

export const GenderEnum = enumType({
	name: 'Gender',
	members: Object.values(Gender),
});
