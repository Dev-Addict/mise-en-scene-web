import {Dispatch, SetStateAction} from 'react';
import {GraphQLError} from 'graphql';

import {
	apolloClient,
	UPDATE_SELF_MUTATION,
	UpdateSelfMutationData,
	UpdateSelfMutationVariables,
} from '../../../../api';
import {errorParser} from '../../../../utils';
import {User} from '../../../../types';
import {SignResponse, UpdateSelfData} from '../auth.context';

interface Props {
	setUser: Dispatch<SetStateAction<User | null>>;
	token?: string;
}

export const updateSelf = ({setUser, token}: Props) => async (
	variables: UpdateSelfData
): Promise<SignResponse> => {
	try {
		const {data} = await apolloClient.mutate<
			UpdateSelfMutationData,
			UpdateSelfMutationVariables
		>({
			mutation: UPDATE_SELF_MUTATION,
			variables,
			context: {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		});

		setUser((user) => ({
			...user,
			...variables,
			...data?.updateSelf,
			birthday: variables.birthday,
			avatar: data?.updateSelf?.avatar || undefined,
			username: variables.username || user?.username,
		}));

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
