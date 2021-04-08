import {list, nonNull, queryField} from 'nexus';
import Axios from 'axios';

import {Gif} from '../../models';
import {getGif} from '../../../../utils';
import {IGif} from '../../../../models';

export const FindGifsQuery = queryField('findGifs', {
	type: nonNull(list(nonNull(Gif))),
	args: {
		page: 'Int',
		limit: 'Int',
		query: nonNull('String'),
	},
	async resolve(_root, {page = 1, limit = 20, query}, {models: {Gif}}) {
		const result: IGif[] = [];

		try {
			const {
				data: {data},
			} = await Axios.get('https://api.giphy.com/v1/gifs/search', {
				params: {
					api_key: process.env.GIPHY_API_KEY,
					country_code: 'ir',
					limit: limit || 20,
					offset: ((page || 1) - 1) * (limit || 20),
					q: query,
					rating: 'g',
				},
			});

			for (const gif of data) {
				result.push(
					await getGif(
						Gif,
						gif.images.downsized.url,
						gif.id,
						gif.title,
						+gif.images.downsized.width,
						+gif.images.downsized.height
					)
				);
			}
		} catch (error) {
			return result as any;
		}

		return result as any;
	},
});
