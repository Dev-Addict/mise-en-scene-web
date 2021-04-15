import {gql} from '@apollo/client';

import {User} from '../../../types';

export const RESET_PASSWORD_REQUEST_MUTATION = gql`
	mutation ResetPasswordRequest($authKey: AuthKey!) {
		resetPasswordRequest(data: {authKey: $authKey}) {
			id
		}
	}
`;

export interface ResetPasswordRequestMutationData {
	resetPasswordRequest: User;
}

export interface ResetPasswordRequestMutationVariables {
	authKey: string;
}
