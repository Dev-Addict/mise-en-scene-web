import {
	apolloClient,
	UPLOAD_IMAGE_MUTATION,
	UploadImageMutationData,
	UploadImageMutationVariables,
} from '../../../api';
import {Image} from '../../../types';

export const uploadImage = async (
	values: UploadImageMutationVariables
): Promise<Image | undefined> => {
	try {
		const {data} = await apolloClient.mutate<
			UploadImageMutationData,
			UploadImageMutationVariables
		>({
			mutation: UPLOAD_IMAGE_MUTATION,
			variables: values,
		});

		return data?.uploadImage;
	} catch (error) {}
};
