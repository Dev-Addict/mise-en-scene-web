import {join} from 'path';
import {existsSync, mkdirSync} from 'fs';
import Jimp from 'jimp';
import {FileUpload} from 'graphql-upload';

import {AppError} from '../../../utils';
import {streamToBufferConvertor} from '../convertor';

export const saveCover = async (
	file: Promise<FileUpload>,
	directory: string
) => {
	const {createReadStream, mimetype} = await file;

	if (!mimetype || mimetype.split('/')[0] !== 'image')
		throw new AppError('0xE000009', 400);

	const stream = createReadStream();
	const filename = `image-${directory.replace(
		/\//g,
		'-'
	)}-${Date.now()}-${Math.random().toString(16)}.jpg`;
	const directoryPath = join(
		__dirname,
		`../../../../dynamic/image/${directory}`
	);
	const path = join(directoryPath, filename);
	if (!existsSync(directoryPath)) mkdirSync(directoryPath);

	const buffer = await streamToBufferConvertor(stream);

	const image = await Jimp.read(buffer);

	await image
		.quality(90)
		.resize(
			image.bitmap.width > image.bitmap.height ? Jimp.AUTO : 200,
			image.bitmap.width > image.bitmap.height ? 200 : Jimp.AUTO
		)
		.crop(
			(image.bitmap.width - 200) / 2,
			(image.bitmap.height - 200) / 2,
			200,
			200
		)
		.write(path);

	return filename;
};
