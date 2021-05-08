import {gql} from '@apollo/client';

export const SELF_QUERY = gql`
	query Self {
		self {
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
`;
