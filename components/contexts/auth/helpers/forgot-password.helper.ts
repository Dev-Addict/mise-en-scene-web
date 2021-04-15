import {GraphQLError} from 'graphql';

import {ForgotPasswordData as Variables, SignResponse} from '../auth.context';
import {
	apolloClient,
	FORGOT_PASSWORD_MUTATION,
	ForgotPasswordData,
	ForgotPasswordVariables,
} from '../../../../api';
import {errorParser} from '../../../../utils';

export const forgotPassword = () => async (
	variables: Variables
): Promise<SignResponse> => {
	try {
		await apolloClient.mutate<ForgotPasswordData, ForgotPasswordVariables>({
			mutation: FORGOT_PASSWORD_MUTATION,
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
