import {Dispatch, SetStateAction} from 'react';
import {GraphQLError} from 'graphql';
import Cookie from 'js-cookie';

import {ResetEmailData, SignResponse} from '../auth.context';
import {User} from '../../../../types';
import {
	apolloClient,
	RESET_EMAIL_MUTATION,
	ResetEmailMutationData,
	ResetEmailMutationVariables,
} from '../../../../api';
import {errorParser} from '../../../../utils';

interface Props {
	setUser: Dispatch<SetStateAction<User | null>>;
	setSigned: Dispatch<SetStateAction<boolean>>;
	setToken: Dispatch<SetStateAction<string | undefined>>;
}

export const resetEmail = ({setUser, setSigned, setToken}: Props) => async (
	variables: ResetEmailData
): Promise<SignResponse> => {
	try {
		const {data} = await apolloClient.mutate<
			ResetEmailMutationData,
			ResetEmailMutationVariables
		>({
			mutation: RESET_EMAIL_MUTATION,
			variables,
		});

		setUser(data?.resetEmail?.user || null);
		Cookie.set('auth-token', data?.resetEmail?.token || '');
		setToken(data?.resetEmail?.token);

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
