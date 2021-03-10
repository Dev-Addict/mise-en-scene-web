import {arg, mutationField, nonNull} from 'nexus';

import {SignUpData} from '../inputs';
import {AuthResponse} from '../../types';
import {saveFile} from '../../../utils';
import {signToken} from '../../../../utils';

export const SignUpMutation = mutationField('signUp', {
	type: AuthResponse,
	args: {
		data: arg({type: nonNull(SignUpData)}),
	},
	async resolve(_root, {data: {avatar, ...data}}, {models: {User}}) {
		const avatarUrl = avatar
			? await saveFile(avatar, 'image', 'user/avatar')
			: undefined;

		const user: any = await User.create({avatar: avatarUrl, ...data});

		const token = signToken(user);

		return {
			user,
			token,
		};
	},
});
