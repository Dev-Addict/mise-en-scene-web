import {
	apolloClient,
	DELETE_POST_MUTATION,
	DeletePostMutationData,
	DeletePostMutationVariables,
} from '../../../api';

export const deletePost = async (id = '', token = '') => {
	try {
		const {data} = await apolloClient.mutate<
			DeletePostMutationData,
			DeletePostMutationVariables
		>({
			mutation: DELETE_POST_MUTATION,
			variables: {id},
			context: {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		});

		return !!data?.deletePost;
	} catch (error) {
		return false;
	}
};
