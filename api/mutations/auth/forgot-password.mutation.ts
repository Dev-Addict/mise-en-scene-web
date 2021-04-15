import {gql} from '@apollo/client';
import {User} from '../../../types';

export const FORGOT_PASSWORD_MUTATION = gql`
	mutation ForgotPassword($authKey: AuthKey!) {
		forgotPassword(data: {authKey: $authKey}) {
			id
		}
	}
`;

export interface ForgotPasswordData {
	forgotPassword: User;
}

export interface ForgotPasswordVariables {
	authKey: string;
}
