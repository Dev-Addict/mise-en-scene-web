import {inputObjectType} from 'nexus';
import {EmailScalar} from '../../../scalars';

export const ResetEmailData = inputObjectType({
	name: 'ResetEmailData',
	definition(t) {
		t.nonNull.field('email', {type: EmailScalar});
		t.nonNull.string('resetToken');
	},
});
