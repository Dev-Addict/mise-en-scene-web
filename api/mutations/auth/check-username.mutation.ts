import {gql} from '@apollo/client';

export const CHECK_USERNAME_MUTATION = gql`
	mutation CheckUsername($username: Username!) {
		checkUsername(data: {username: $username})
	}
`;
