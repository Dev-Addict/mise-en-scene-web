import {inputObjectType, list, nonNull} from 'nexus';

import {DateScalar, UploadScalar} from '../../../scalars';
import {AnnouncementPollData} from '../../../inputs';

export const AnnounceData = inputObjectType({
	name: 'AnnounceData',
	definition(t) {
		t.nonNull.string('text');
		t.id('gif');
		t.field('images', {
			type: list(nonNull(UploadScalar)),
		});
		t.field('poll', {
			type: AnnouncementPollData,
		});
		t.field('publishAt', {
			type: DateScalar,
		});
	},
});
