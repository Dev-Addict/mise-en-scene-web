import {join} from 'path';
import {createWriteStream, existsSync, mkdirSync} from 'fs';
import {FileUpload} from 'graphql-upload';

import {AppError, getExtension} from '../../../utils';

export const saveFile = async (
	file: Promise<FileUpload> | string,
	type: string,
	directory: string
) => {
	if (typeof file === 'string') return file;

	const {createReadStream, mimetype, filename: clientFilename} = await file;

	if (!mimetype || mimetype.split('/')[0] !== type)
		throw new AppError('0xE000009', 400);

	const stream = createReadStream();
	const filename = `${type}-${directory.replace(
		/\//g,
		'-'
	)}-${Date.now()}-${Math.random().toString(16)}.${getExtension(
		clientFilename
	)}`;
	const directoryPath = join(
		__dirname,
		`../../../../dynamic/${type}/${directory}`
	);
	const path = join(directoryPath, filename);
	if (!existsSync(directoryPath)) mkdirSync(directoryPath);
	await stream.pipe(createWriteStream(path));

	return filename;
};
