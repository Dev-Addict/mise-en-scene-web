import {gql} from '@apollo/client';

import {PostRating} from '../../../../types';

export const RATE_POST_MUTATION = gql`
	mutation RatePost($rating: Int!, $post: ID!) {
		ratePost(data: {rating: $rating, post: $post}) {
			rating
		}
	}
`;

export interface RatePostMutationData {
	ratePost: PostRating;
}

export interface RatePostMutationVariables {
	rating: number;
	post: string;
}
