import {inputObjectType} from 'nexus';

export const VerifyEmailData = inputObjectType({
	name: 'VerifyEmailData',
	definition(t) {
		t.nonNull.string('verifyToken');
	},
});
