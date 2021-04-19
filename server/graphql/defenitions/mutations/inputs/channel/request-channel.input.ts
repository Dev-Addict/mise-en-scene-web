import {inputObjectType} from 'nexus';

import {UploadScalar, UsernameScalar} from '../../../scalars';

export const RequestChannelData = inputObjectType({
	name: 'RequestChannelData',
	definition(t) {
		t.nonNull.field('handle', {type: UsernameScalar});
		t.nonNull.string('name');
		t.field('cover', {type: UploadScalar});
	},
});
