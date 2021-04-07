import {join} from 'path';
import {createWriteStream, existsSync, mkdirSync} from 'fs';
import {FileUpload} from 'graphql-upload';

import {AppError, getExtension} from '../../../utils';
import {imageSize} from './image-size.util';

export const saveImage = async (
	file: Promise<FileUpload>,
	directory: string
) => {
	const {createReadStream, mimetype, filename: clientFilename} = await file;

	if (!mimetype || mimetype.split('/')[0] !== 'image')
		throw new AppError('0xE000009', 400);

	const stream = createReadStream();
	const filename = `image-${directory.replace(
		/\//g,
		'-'
	)}-${Date.now()}-${Math.random().toString(16)}.${getExtension(
		clientFilename
	)}`;
	const directoryPath = join(
		__dirname,
		`../../../../public/image/${directory}`
	);
	const path = join(directoryPath, filename);
	if (!existsSync(directoryPath)) mkdirSync(directoryPath);

	stream.pipe(createWriteStream(path));

	const {width, height} = await imageSize(stream);

	return {
		filename,
		width,
		height,
	};
};
