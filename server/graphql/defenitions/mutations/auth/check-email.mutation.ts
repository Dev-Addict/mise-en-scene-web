import {arg, mutationField, nonNull} from 'nexus';
import {CheckEmailData} from '../inputs';

export const CheckEmailMutation = mutationField('checkEmail', {
	type: nonNull('Boolean'),
	args: {
		data: arg({type: nonNull(CheckEmailData)}),
	},
	async resolve(_root, {data: {email}}, {models: {User}}) {
		return !(await User.countDocuments({email}));
	},
});
