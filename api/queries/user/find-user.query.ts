import {gql} from '@apollo/client';

export const FIND_USER_QUERY = gql`
	query FindUser($username: Username!) {
		findUser(filter: {username: $username}) {
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
	username: string;
}

export interface FindUserQueryDataFindUser {
	id: string;
	firstname: string | null;
	lastname: string | null;
	displayName: string | null;
	username: string;
	bio: string | null;
	followers: number;
	followings: number;
	avatar: string;
	isFollowed: boolean;
}

export interface FindUserQueryData {
	findUser?: FindUserQueryDataFindUser;
}
