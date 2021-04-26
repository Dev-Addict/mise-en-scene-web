import {inputObjectType} from 'nexus';

import {UploadScalar} from '../../../scalars';

export const UploadImageData = inputObjectType({
	name: 'UploadImageData',
	definition(t) {
		t.nonNull.field('image', {type: UploadScalar});
		t.string('alt');
	},
});
