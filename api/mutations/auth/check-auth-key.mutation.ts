import {gql} from '@apollo/client';

export const CHECK_AUTH_KEY_MUTATION = gql`
	mutation CheckAuthKey($authKey: AuthKey!) {
		checkAuthKey(data: {authKey: $authKey})
	}
`;

export interface CheckAuthKeyMutationData {
	checkAuthKey: boolean;
}

export interface CheckAuthKeyMutationVariables {
	authKey: string;
}
