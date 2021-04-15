import {gql} from '@apollo/client';

import {Gender, None, User} from '../../../types';

export const UPDATE_SELF_MUTATION = gql`
	mutation UpdateSelf(
		$avatar: Upload
		$bio: String
		$birthday: Date
		$displayName: String
		$firstname: Name
		$gender: Gender
		$lastname: Name
		$username: Username
	) {
		updateSelf(
			data: {
				avatar: $avatar
				bio: $bio
				birthday: $birthday
				displayName: $displayName
				firstname: $firstname
				gender: $gender
				lastname: $lastname
				username: $username
			}
		) {
			avatar
		}
	}
`;

export interface UpdateSelfMutationData {
	updateSelf: User;
}

export interface UpdateSelfMutationVariables {
	avatar?: None<File>;
	bio?: None<string>;
	birthday?: None<number>;
	displayName?: None<string>;
	firstname?: None<string>;
	gender?: None<Gender>;
	lastname?: None<string>;
	username?: None<string>;
}
