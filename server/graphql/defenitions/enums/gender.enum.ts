import {enumType} from 'nexus';

import {Gender} from '../../../models';

export const GenderEnum = enumType({
	name: 'Gender',
	members: Object.values(Gender),
});
