import {gql} from '@apollo/client';

import {GifResult} from './gifs.type';

export const FIND_GIFS_QUERY = gql`
	query FindGifs($query: String!, $page: Int) {
		findGifs(query: $query, page: $page) {
			id
			title
			url
			width
			height
		}
	}
`;

export interface FindGifsVariables {
	query: string;
	page?: number;
}

export interface FindGifsData {
	findGifs: GifResult[];
}
