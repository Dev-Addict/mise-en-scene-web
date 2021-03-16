import {gql} from 'graphql-tag';

export const SIGN_UP_MUTATION = gql`
	mutation SignUp($email: Email!, $username: Username!, $password: Password!) {
		signUp(data: {email: $email, username: $username, password: $password}) {
			token
			user {
				id
			}
		}
	}
`;
