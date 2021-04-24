import {gql} from '@apollo/client';

import {None, User} from '../../../types';

export const FIND_USER_QUERY = gql`
	query FindUser($filter: JSON!) {
		findUser(filter: $filter) {
			id
			firstname
			lastname
			displayName
			username
			bio
			followers
			followings
			avatar
			isFollowed
		}
	}
`;

export interface FindUserQueryVariables {
	filter: {[key: string]: any};
}

export interface FindUserQueryData {
	findUser?: None<User>;
}
