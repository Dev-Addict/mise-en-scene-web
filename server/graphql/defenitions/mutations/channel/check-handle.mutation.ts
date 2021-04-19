import {mutationField, nonNull} from 'nexus';

import {CheckHandleData} from '../inputs';

export const CheckHandleMutation = mutationField('checkHandle', {
	type: 'Boolean',
	args: {
		data: nonNull(CheckHandleData),
	},
	async resolve(_root, {data: {handle}}, {models: {Channel}}) {
		return !(await Channel.countDocuments({handle}));
	},
});
