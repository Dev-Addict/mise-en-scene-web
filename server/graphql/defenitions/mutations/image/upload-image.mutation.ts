import {mutationField, nonNull} from 'nexus';

import {Image} from '../../models';
import {UploadImageData} from '../inputs';
import {saveImage} from '../../../utils';

export const UploadImageMutation = mutationField('uploadImage', {
	type: Image,
	args: {
		data: nonNull(UploadImageData),
	},
	async resolve(_root, {data: {image, alt}}, {models: {Image}}) {
		const directory = 'upload';

		const {filename, width, height} = await saveImage(image, directory);

		return <any>Image.create({image: filename, directory, width, height, alt});
	},
});
