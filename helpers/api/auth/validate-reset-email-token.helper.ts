import {GraphQLError} from 'graphql';

import {
	apolloClient,
	VALIDATE_RESET_EMAIL_TOKEN_MUTATION,
	ValidateResetEmailTokenMutationData,
	ValidateResetEmailTokenMutationVariables,
} from '../../../api';
import {User} from '../../../types';

export const validateResetEmailToken = async (resetToken: string) => {
	let user: User | undefined = undefined;
	let expired = false;

	try {
		const {data} = await apolloClient.mutate<
			ValidateResetEmailTokenMutationData,
			ValidateResetEmailTokenMutationVariables
		>({
			mutation: VALIDATE_RESET_EMAIL_TOKEN_MUTATION,
			variables: {resetToken: resetToken},
		});

		user = data?.validateResetEmailToken;
	} catch (error) {
		if (
			error?.graphQLErrors
				?.map(({extensions}: GraphQLError) => extensions?.message)
				.includes('0xE00005F')
		)
			expired = true;
	}

	return {
		user,
		exists: !!user,
		expired,
	};
};
