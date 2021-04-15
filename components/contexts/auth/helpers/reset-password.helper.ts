import {Dispatch, SetStateAction} from 'react';
import {GraphQLError} from 'graphql';
import Cookie from 'js-cookie';

import {ResetPasswordData, SignResponse} from '../auth.context';
import {User} from '../../../../types';
import {
	apolloClient,
	RESET_PASSWORD_MUTATION,
	ResetPasswordMutationData,
	ResetPasswordMutationVariables,
} from '../../../../api';
import {errorParser} from '../../../../utils';

interface Props {
	setUser: Dispatch<SetStateAction<User | null>>;
	setSigned: Dispatch<SetStateAction<boolean>>;
	setToken: Dispatch<SetStateAction<string | undefined>>;
}

export const resetPassword = ({setUser, setSigned, setToken}: Props) => async (
	variables: ResetPasswordData
): Promise<SignResponse> => {
	try {
		const {data} = await apolloClient.mutate<
			ResetPasswordMutationData,
			ResetPasswordMutationVariables
		>({
			mutation: RESET_PASSWORD_MUTATION,
			variables,
		});

		setUser(data?.resetPassword?.user || null);
		Cookie.set('auth-token', data?.resetPassword?.token || '');
		setToken(data?.resetPassword?.token);

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
