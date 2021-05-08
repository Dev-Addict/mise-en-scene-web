import {GraphQLError} from 'graphql';

import {
	apolloClient,
	VERIFY_EMAIL_MUTATION,
	VerifyEmailMutationData,
	VerifyEmailMutationVariables,
} from '../../../api';
import {User} from '../../../types';

export const verifyEmail = async (verifyToken: string) => {
	let user: User | undefined = undefined;
	let expired = false;

	try {
		const {data} = await apolloClient.mutate<
			VerifyEmailMutationData,
			VerifyEmailMutationVariables
		>({
			mutation: VERIFY_EMAIL_MUTATION,
			variables: {verifyToken: verifyToken},
		});

		user = data?.verifyEmail?.user;
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
