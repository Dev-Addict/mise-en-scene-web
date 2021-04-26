import {gql} from '@apollo/client';

import {Image} from '../../../types';

export const UPLOAD_IMAGE_MUTATION = gql`
	mutation UploadImage($alt: String, $image: Upload!) {
		uploadImage(data: {alt: $alt, image: $image}) {
			id
			image
			alt
			directory
			width
			height
		}
	}
`;

export interface UploadImageMutationData {
	uploadImage: Image;
}

export interface UploadImageMutationVariables {
	image: File;
	alt?: string;
}
