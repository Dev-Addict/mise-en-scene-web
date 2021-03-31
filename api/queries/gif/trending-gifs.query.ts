import {gql} from '@apollo/client';

import {GifResult} from './gifs.type';

export const TRENDING_GIFS_QUERY = gql`
	query TrendingGifs($page: Int) {
		trendingGifs(page: $page) {
			id
			title
			url
			width
			height
		}
	}
`;

export interface TrendingGifsVariables {
	page?: number;
}

export interface TrendingGifsData {
	trendingGifs: GifResult[];
}
