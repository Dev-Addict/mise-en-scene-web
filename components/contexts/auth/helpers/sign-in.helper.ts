import {Dispatch, SetStateAction} from 'react';
import {GraphQLError} from 'graphql';
import Cookie from 'js-cookie';

import {SignInData, SignResponse} from '../auth.context';
import {User} from '../../../../types';
import {apolloClient, SIGN_IN_MUTATION} from '../../../../api';
import {errorParser} from '../../../../utils';

interface Props {
	setUser: Dispatch<SetStateAction<User | null>>;
	setSigned: Dispatch<SetStateAction<boolean>>;
	setToken: Dispatch<SetStateAction<string | undefined>>;
}

export const signIn = ({setUser, setSigned, setToken}: Props) => async (
	variables: SignInData
): Promise<SignResponse> => {
	try {
		const {data} = await apolloClient.mutate({
			mutation: SIGN_IN_MUTATION,
			variables,
		});

		setUser(data?.signIn?.user || null);
		Cookie.set('auth-token', data?.signIn?.token);
		setToken(data?.signIn?.token);

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
