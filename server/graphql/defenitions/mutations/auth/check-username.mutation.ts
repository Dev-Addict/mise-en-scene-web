import {arg, mutationField, nonNull} from 'nexus';
import {CheckUsernameData} from '../inputs';

export const CheckUsernameMutation = mutationField('checkUsername', {
	type: nonNull('Boolean'),
	args: {
		data: arg({type: nonNull(CheckUsernameData)}),
	},
	async resolve(_root, {data: {username}}, {models: {User}}) {
		return !(await User.countDocuments({username}));
	},
});
