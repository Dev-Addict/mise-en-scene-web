import {gql} from '@apollo/client';

import {User} from '../../../types';

export const RESET_EMAIL_REQUEST_MUTATION = gql`
	mutation ResetEmailRequest($email: Email!) {
		resetEmailRequest(data: {email: $email}) {
			id
		}
	}
`;

export interface ResetEmailRequestData {
	resetEmailRequest: User;
}

export interface ResetEmailRequestVariables {
	email: string;
}
