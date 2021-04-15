import {inputObjectType} from 'nexus';

import {
	DateScalar,
	NameScalar,
	UploadScalar,
	UsernameScalar,
} from '../../../scalars';
import {GenderEnum} from '../../../enums';

export const UpdateSelfData = inputObjectType({
	name: 'UpdateSelfData',
	definition(t) {
		t.field('avatar', {type: UploadScalar});
		t.field('firstname', {type: NameScalar});
		t.field('lastname', {type: NameScalar});
		t.field('username', {type: UsernameScalar});
		t.string('displayName');
		t.field('birthday', {type: DateScalar});
		t.string('bio');
		t.field('gender', {type: GenderEnum});
	},
});
