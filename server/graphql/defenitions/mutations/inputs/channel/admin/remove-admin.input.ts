import {inputObjectType} from 'nexus';

export const RemoveAdminData = inputObjectType({
	name: 'RemoveAdminData',
	definition(t) {
		t.nonNull.id('channel');
		t.nonNull.id('admin');
	},
});
