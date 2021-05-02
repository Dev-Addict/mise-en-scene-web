import {inputObjectType} from 'nexus';

import {UploadScalar, UsernameScalar} from '../../../scalars';

export const UpdateChannelData = inputObjectType({
	name: 'UpdateChannelData',
	definition(t) {
		t.field('handle', {type: UsernameScalar});
		t.string('name');
		t.field('cover', {type: UploadScalar});
	},
});
