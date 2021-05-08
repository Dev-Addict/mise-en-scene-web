import {gql} from '@apollo/client';

import {User} from '../../../types';

export const VERIFY_EMAIL_MUTATION = gql`
	mutation VerifyEmail($verifyToken: String!) {
		verifyEmail(data: {verifyToken: $verifyToken}) {
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

export interface VerifyEmailMutationData {
	verifyEmail: {
		token?: string;
		user?: User;
	};
}

export interface VerifyEmailMutationVariables {
	verifyToken: string;
}
