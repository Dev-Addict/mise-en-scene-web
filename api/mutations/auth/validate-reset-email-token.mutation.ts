import {gql} from '@apollo/client';

import {User} from '../../../types';

export const VALIDATE_RESET_EMAIL_TOKEN_MUTATION = gql`
	mutation ValidateResetEmailToken($resetToken: String!) {
		validateResetEmailToken(data: {resetToken: $resetToken}) {
			avatar
			username
			firstname
			lastname
			displayName
		}
	}
`;

export interface ValidateResetEmailTokenMutationData {
	validateResetEmailToken: User;
}

export interface ValidateResetEmailTokenMutationVariables {
	resetToken: string;
}
