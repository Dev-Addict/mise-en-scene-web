import {
	apolloClient,
	DELETE_ANNOUNCEMENT_MUTATION,
	DeleteAnnouncementMutationData,
	DeleteAnnouncementMutationVariables,
} from '../../../api';

export const deleteAnnouncement = async (id = '', token = '') => {
	try {
		const {data} = await apolloClient.mutate<
			DeleteAnnouncementMutationData,
			DeleteAnnouncementMutationVariables
		>({
			mutation: DELETE_ANNOUNCEMENT_MUTATION,
			variables: {id},
			context: {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		});

		return !!data?.deleteAnnouncement;
	} catch (error) {
		return false;
	}
};
