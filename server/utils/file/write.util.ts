import {createWriteStream} from 'fs';
import Axios from 'axios';

export const write = async (path: string, url: string) => {
	const writer = createWriteStream(path);

	const response = await Axios({
		url,
		method: 'GET',
		responseType: 'stream',
	});

	response.data.pipe(writer);

	return new Promise((resolve, reject) => {
		writer.on('finish', resolve);
		writer.on('error', reject);
	});
};
