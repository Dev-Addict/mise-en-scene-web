import {inputObjectType} from 'nexus';

import {DateScalar, EmailScalar, NameScalar, PasswordScalar, UploadScalar, UsernameScalar} from '../../../scalars';
import {GenderEnum} from '../../../enums';

export const SignUpData = inputObjectType({
	name: 'SignUpData',
	definition(t) {
		t.field('firstname', {type: NameScalar});
		t.field('lastname', {type: NameScalar});
		t.nonNull.field('email', {type: EmailScalar});
		t.field('avatar', {type: UploadScalar});
		t.field('birthday', {type: DateScalar});
		t.field('gender', {type: GenderEnum});
		t.nonNull.field('password', {type: PasswordScalar});
		t.nonNull.field('username', {type: UsernameScalar});
		t.string('bio');
	},
});
