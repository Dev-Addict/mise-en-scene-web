import {join} from 'path';
import {readFile} from 'fs';
import {promisify} from 'util';

export const readJson = async (filename: string, directory: string) => {
	const directoryPath = join(
		__dirname,
		`../../../../private/json/${directory}`
	);
	const path = join(directoryPath, filename);

	return JSON.parse((await promisify(readFile)(path)).toString());
};
