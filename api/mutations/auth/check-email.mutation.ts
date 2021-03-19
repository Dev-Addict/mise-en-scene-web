import {gql} from '@apollo/client';

export const CHECK_EMAIL_MUTATION = gql`
	mutation CheckEmail($email: Email!) {
		checkEmail(data: {email: $email})
	}
`;
