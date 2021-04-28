import {join} from 'path';
import {writeFile, existsSync, mkdirSync} from 'fs';
import {promisify} from 'util';

export const saveJson = async (
	json: {[key: string]: any},
	directory: string
) => {
	const filename = `${json}-${directory.replace(
		/\//g,
		'-'
	)}-${Date.now()}-${Math.random().toString(16)}.json`;
	const directoryPath = join(
		__dirname,
		`../../../../private/json/${directory}`
	);
	const path = join(directoryPath, filename);
	if (!existsSync(directoryPath)) mkdirSync(directoryPath);

	await promisify(writeFile)(path, JSON.stringify(json));

	return filename;
};
