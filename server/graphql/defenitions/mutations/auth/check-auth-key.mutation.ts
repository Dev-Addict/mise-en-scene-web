import {arg, mutationField, nonNull} from 'nexus';
import {CheckAuthKeyData} from '../inputs';

export const CheckAuthKeyMutation = mutationField('checkAuthKey', {
	type: nonNull('Boolean'),
	args: {
		data: arg({type: nonNull(CheckAuthKeyData)}),
	},
	async resolve(_root, {data: {authKey}}, {models: {User}}) {
		return !(await User.countDocuments({
			$or: [
				{
					email: authKey,
				},
				{
					username: authKey,
				},
			],
		}));
	},
});
