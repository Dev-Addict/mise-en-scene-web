import {gql} from '@apollo/client';

import {User} from '../../../types';

export const VALIDATE_RESET_PASSWORD_TOKEN_MUTATION = gql`
	mutation ValidateResetPasswordToken($resetToken: String!) {
		validateResetPasswordToken(data: {resetToken: $resetToken}) {
			avatar
			username
			firstname
			lastname
			displayName
		}
	}
`;

export interface ValidateResetPasswordTokenMutationData {
	validateResetPasswordToken: User;
}

export interface ValidateResetPasswordTokenMutationVariables {
	resetToken: string;
}
