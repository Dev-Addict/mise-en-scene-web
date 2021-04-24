import {
	apolloClient,
	FIND_USER_QUERY,
	FindUserQueryData,
	FindUserQueryVariables,
} from '../../../api';
import {User} from '../../../types';

export const findUser = async (
	filter: {[key: string]: any},
	token?: string
) => {
	let user: User | undefined = undefined;

	try {
		const {data} = await apolloClient.query<
			FindUserQueryData,
			FindUserQueryVariables
		>({
			query: FIND_USER_QUERY,
			variables: {
				filter,
			},
			context: {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		});

		user = data.findUser || undefined;
	} catch (error) {}

	return user;
};
