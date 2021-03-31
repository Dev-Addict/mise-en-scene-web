import {mkdir} from 'fs';
import {promisify} from 'util';

export const ensurePath = async (path: string) => {
	try {
		await promisify(mkdir)(path);

		return true;
	} catch (error) {}

	return false;
};
