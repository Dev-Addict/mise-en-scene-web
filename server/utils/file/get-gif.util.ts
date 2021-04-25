import {join} from 'path';
import {Model} from 'mongoose';

import {IGif} from '../../models';
import {ensurePath} from './ensure-path.util';
import {write} from './write.util';

export const getGif = async (
	Gif: Model<IGif>,
	giphyUrl: string,
	giphyId: string,
	title: string,
	width: number,
	height: number
): Promise<IGif> => {
	let gif = await Gif.findOne({giphyId});

	if (!gif) {
		try {
			const directory = join(__dirname, `../../../dynamic/image/gif/`);
			const filename = `${giphyId}.gif`;
			const path = join(directory, filename);

			await ensurePath(directory);

			await write(path, giphyUrl);

			gif = await Gif.create({giphyId, title, url: filename, width, height});

			return gif as IGif;
		} catch (error) {
			return getGif(Gif, giphyUrl, giphyId, title, width, height);
		}
	}

	return gif;
};
