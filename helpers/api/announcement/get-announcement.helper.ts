import {
	ANNOUNCEMENT_QUERY,
	AnnouncementQueryData,
	AnnouncementQueryVariables,
	apolloClient,
} from '../../../api';
import {Announcement} from '../../../types';

export const getAnnouncement = async (id: string, token: string) => {
	let announcement: Announcement | undefined = undefined;

	try {
		const {data} = await apolloClient.query<
			AnnouncementQueryData,
			AnnouncementQueryVariables
		>({
			query: ANNOUNCEMENT_QUERY,
			variables: {
				id: id as string,
			},
			context: {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		});

		announcement = data.announcement || undefined;
	} catch (error) {}

	return announcement;
};
