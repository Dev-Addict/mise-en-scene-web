import {inputObjectType} from 'nexus';

export const AcceptAdminData = inputObjectType({
	name: 'AcceptAdminData',
	definition(t) {
		t.nonNull.id('channel');
	},
});
