import {mutationField, nonNull} from 'nexus';
import {User} from '../../models';
import {UpdateSelfData} from '../inputs';
import {protect} from '../../../../utils';
import {saveFile} from '../../../utils';

export const UpdateSelfMutation = mutationField('updateSelf', {
	type: User,
	args: {
		data: nonNull(UpdateSelfData),
	},
	async resolve(_root, {data: {avatar, ...data}}, {models: {User}, req}) {
		const user = (await protect(req, User))!;

		if (avatar) user.avatar = await saveFile(avatar, 'image', 'user/avatar');

		await user.updateOne(data as any);
		await user.save();

		return <any>user;
	},
});
