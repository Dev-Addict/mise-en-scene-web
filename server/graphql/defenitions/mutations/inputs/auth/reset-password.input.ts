import {inputObjectType} from 'nexus';
import {PasswordScalar} from '../../../scalars';

export const ResetPasswordData = inputObjectType({
	name: 'ResetPasswordData',
	definition(t) {
		t.nonNull.field('password', {type: PasswordScalar});
		t.nonNull.string('resetToken');
	},
});
