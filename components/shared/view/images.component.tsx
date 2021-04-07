import React, {FC} from 'react';

import {Image} from './image.component';
import {ImagesGallery} from './images-gallery';
import {Image as ImageModel} from '../../../types';

interface Props {
	images: ImageModel[];
}

export const Images: FC<Props> = ({images}) => {
	if (images.length < 1) return <></>;
	if (images.length === 1) return <Image image={images[0]} />;

	return <ImagesGallery images={images} />;
};
