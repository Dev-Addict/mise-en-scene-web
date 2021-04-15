import {GraphQLError} from 'graphql';

import {
	ResetPasswordRequestData as Variables,
	SignResponse,
} from '../auth.context';
import {
	apolloClient,
	RESET_PASSWORD_REQUEST_MUTATION,
	ResetPasswordRequestMutationData,
	ResetPasswordRequestMutationVariables,
} from '../../../../api';
import {errorParser} from '../../../../utils';

export const resetPasswordRequest = () => async (
	variables: Variables
): Promise<SignResponse> => {
	try {
		await apolloClient.mutate<
			ResetPasswordRequestMutationData,
			ResetPasswordRequestMutationVariables
		>({
			mutation: RESET_PASSWORD_REQUEST_MUTATION,
			variables,
		});

		return {success: true};
	} catch (error) {
		return {
			success: false,
			errors: errorParser(
				error?.graphQLErrors?.map(({extensions}: GraphQLError) => extensions) ||
					[]
			),
		};
	}
};
