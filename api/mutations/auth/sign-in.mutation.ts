import {gql} from '@apollo/client';

export const SIGN_IN_MUTATION = gql`
	mutation SignIn($authKey: AuthKey!, $password: Password!) {
		signIn(data: {authKey: $authKey, password: $password}) {
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
			}
		}
	}
`;
