import {nonNull, queryField} from 'nexus';

import {Channel} from '../../models';
import {JSONScalar} from '../../scalars';

export const FindChannelQuery = queryField('findChannel', {
	type: Channel,
	args: {
		filter: nonNull(JSONScalar),
	},
	resolve(_root, {filter}, {models: {Channel}}) {
		return <any>Channel.findOne(filter);
	},
});
