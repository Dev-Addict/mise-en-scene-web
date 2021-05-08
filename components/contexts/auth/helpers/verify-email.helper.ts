import {Dispatch, SetStateAction} from 'react';
import {GraphQLError} from 'graphql';
import Cookie from 'js-cookie';

import {VerifyEmailData, SignResponse} from '../auth.context';
import {User} from '../../../../types';
import {
	apolloClient,
	VERIFY_EMAIL_MUTATION,
	VerifyEmailMutationData,
	VerifyEmailMutationVariables,
} from '../../../../api';
import {errorParser} from '../../../../utils';

interface Props {
	setUser: Dispatch<SetStateAction<User | null>>;
	setSigned: Dispatch<SetStateAction<boolean>>;
	setToken: Dispatch<SetStateAction<string | undefined>>;
}

export const verifyEmail = ({setUser, setSigned, setToken}: Props) => async (
	variables: VerifyEmailData
): Promise<SignResponse> => {
	try {
		const {data} = await apolloClient.mutate<
			VerifyEmailMutationData,
			VerifyEmailMutationVariables
		>({
			mutation: VERIFY_EMAIL_MUTATION,
			variables,
		});

		setUser(data?.verifyEmail?.user || null);
		Cookie.set('auth-token', data?.verifyEmail?.token || '');
		setToken(data?.verifyEmail?.token);

		setSigned(true);

		return {
			success: true,
		};
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
