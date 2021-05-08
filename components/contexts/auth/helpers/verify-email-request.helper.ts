import {GraphQLError} from 'graphql';

import {
	VerifyEmailRequestData as Variables,
	SignResponse,
} from '../auth.context';
import {
	apolloClient,
	VERIFY_EMAIL_REQUEST_MUTATION,
	VerifyEmailRequestData,
	VerifyEmailRequestVariables,
} from '../../../../api';
import {errorParser} from '../../../../utils';

export const verifyEmailRequest = () => async (
	variables: Variables
): Promise<SignResponse> => {
	try {
		await apolloClient.mutate<
			VerifyEmailRequestData,
			VerifyEmailRequestVariables
		>({
			mutation: VERIFY_EMAIL_REQUEST_MUTATION,
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
