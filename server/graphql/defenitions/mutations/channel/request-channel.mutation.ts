import {mutationField, nonNull} from 'nexus';

import {Channel} from '../../models';
import {RequestChannelData} from '../inputs';
import {protect} from '../../../../utils';
import {saveCover} from '../../../utils';

export const RequestChannelMutation = mutationField('requestChannel', {
	type: nonNull(Channel),
	args: {
		data: nonNull(RequestChannelData),
	},
	async resolve(
		_root,
		{data: {cover, ...data}},
		{req, models: {User, Channel}}
	) {
		const {id: owner} = (await protect(req, User))!;

		let coverUrl = cover ? await saveCover(cover, 'channel/cover') : undefined;

		return <any>Channel.create({...data, owner, cover: coverUrl});
	},
});
