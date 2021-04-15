import {GraphQLError} from 'graphql';

import {
	apolloClient,
	VALIDATE_RESET_PASSWORD_TOKEN_MUTATION,
	ValidateResetPasswordTokenMutationData,
	ValidateResetPasswordTokenMutationVariables,
} from '../../../api';
import {User} from '../../../types';

export const validateResetPasswordTokenHelper = async (resetToken: string) => {
	let user: User | undefined = undefined;
	let expired = false;

	try {
		const {data} = await apolloClient.mutate<
			ValidateResetPasswordTokenMutationData,
			ValidateResetPasswordTokenMutationVariables
		>({
			mutation: VALIDATE_RESET_PASSWORD_TOKEN_MUTATION,
			variables: {resetToken: resetToken},
		});

		user = data?.validateResetPasswordToken;
	} catch (error) {
		if (
			error?.graphQLErrors
				?.map(({extensions}: GraphQLError) => extensions?.message)
				.includes('0xE00005B')
		)
			expired = true;
	}

	return {
		user,
		exists: !!user,
		expired,
	};
};
