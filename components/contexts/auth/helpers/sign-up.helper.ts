import {Dispatch, SetStateAction} from 'react';
import {GraphQLError} from 'graphql';
import Cookie from 'js-cookie';

import {apolloClient, SIGN_UP_MUTATION} from '../../../../api';
import {errorParser} from '../../../../utils';
import {User} from '../../../../types';
import {SignResponse, SignUpData} from '../auth.context';

interface Props {
	setUser: Dispatch<SetStateAction<User | null>>;
	setSigned: Dispatch<SetStateAction<boolean>>;
	setToken: Dispatch<SetStateAction<string | undefined>>;
}

export const signUp = ({setUser, setSigned, setToken}: Props) => async (
	variables: SignUpData
): Promise<SignResponse> => {
	try {
		const {data} = await apolloClient.mutate({
			mutation: SIGN_UP_MUTATION,
			variables,
		});

		setUser(data?.signUp?.user);
		Cookie.set('auth-token', data?.signUp?.token);
		setToken(data?.signUp?.token);

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
