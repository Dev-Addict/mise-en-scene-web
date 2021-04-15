import {GraphQLError} from 'graphql';

import {
	ResetEmailRequestData as Variables,
	SignResponse,
} from '../auth.context';
import {
	apolloClient,
	RESET_EMAIL_REQUEST_MUTATION,
	ResetEmailRequestData,
	ResetEmailRequestVariables,
} from '../../../../api';
import {errorParser} from '../../../../utils';

export const resetEmailRequest = () => async (
	variables: Variables
): Promise<SignResponse> => {
	try {
		await apolloClient.mutate<
			ResetEmailRequestData,
			ResetEmailRequestVariables
		>({
			mutation: RESET_EMAIL_REQUEST_MUTATION,
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
