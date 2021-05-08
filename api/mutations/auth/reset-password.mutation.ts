import {gql} from '@apollo/client';
import {User} from '../../../types';

export const RESET_PASSWORD_MUTATION = gql`
	mutation ResetPassword($resetToken: String!, $password: Password!) {
		resetPassword(data: {resetToken: $resetToken, password: $password}) {
			token
			user {
				id
				firstname
				lastname
				email
				avatar
				birthday
				gender
				username
				bio
				displayName
				notifications
				verifiedEmail
			}
		}
	}
`;

export interface ResetPasswordMutationData {
	resetPassword: {
		token?: string;
		user?: User;
	};
}

export interface ResetPasswordMutationVariables {
	resetToken: string;
	password: string;
}
