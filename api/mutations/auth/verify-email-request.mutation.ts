import {gql} from '@apollo/client';

import {User} from '../../../types';

export const VERIFY_EMAIL_REQUEST_MUTATION = gql`
	mutation VerifyEmailRequest($email: Email!) {
		verifyEmailRequest(data: {email: $email}) {
			id
		}
	}
`;

export interface VerifyEmailRequestData {
	verifyEmailRequest: User;
}

export interface VerifyEmailRequestVariables {
	email: string;
}
