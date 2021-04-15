import {gql} from '@apollo/client';

import {User} from '../../../types';

export const RESET_EMAIL_MUTATION = gql`
	mutation ResetEmail($resetToken: String!, $email: Email!) {
		resetEmail(data: {resetToken: $resetToken, email: $email}) {
			token
			user {
				id
				firstname
				lastname
				email
				avatar
				birthday
				username
				bio
				displayName
			}
		}
	}
`;

export interface ResetEmailMutationData {
	resetEmail: {
		token?: string;
		user?: User;
	};
}

export interface ResetEmailMutationVariables {
	resetToken: string;
	email: string;
}
