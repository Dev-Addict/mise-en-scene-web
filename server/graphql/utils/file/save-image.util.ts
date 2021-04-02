import {join} from 'path';
import {createWriteStream, existsSync, mkdirSync} from 'fs';
import sharp from 'sharp';
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

	const transformer = sharp().jpeg({
		quality: 90,
		trellisQuantisation: true,
		overshootDeringing: true,
		optimiseScans: true,
		quantisationTable: 3,
	});

	const {width, height} = await imageSize(stream);

	const transformedStream = await stream.pipe(transformer);

	transformedStream.pipe(createWriteStream(path));

	return {
		filename,
		width,
		height,
	};
};
