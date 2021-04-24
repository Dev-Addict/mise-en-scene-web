import React, {Dispatch, FC, SetStateAction} from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
	Container,
	Item,
	Side,
} from './announcment-card-actions-components.component';
import {Announcement} from 'types';
import {useCopy, useThemeImage} from 'hooks';
import {AnnouncementCardActionsReact} from './announcement-card-actions-react.component';
import {useMutation} from '@apollo/client';
import {
	DISLIKE_MUTATION,
	DislikeMutationData,
	DislikeMutationVariables,
	LIKE_MUTATION,
	LikeMutationData,
	LikeMutationVariables,
} from 'api';
import {BASE_URL} from 'config';
import {SlideMessage, Text} from 'components';

interface Props {
	announcement: Announcement;
	setAnnouncement: Dispatch<SetStateAction<Announcement>>;
}

export const AnnouncementCardActions: FC<Props> = ({
	announcement: {id, reAnnouncements, comments},
	setAnnouncement,
	announcement,
}) => {
	const comment = useThemeImage('/assets/icons/comment/comment-$mode.svg');
	const repeat = useThemeImage('/assets/icons/repeat/repeat-$mode.svg');
	const share = useThemeImage('/assets/icons/share/share-$mode.svg');

	const likeMT = useMutation<LikeMutationData, LikeMutationVariables>(
		LIKE_MUTATION,
		{
			variables: {
				announcement: id || '',
			},
		}
	);
	const dislikeMT = useMutation<DislikeMutationData, DislikeMutationVariables>(
		DISLIKE_MUTATION,
		{
			variables: {
				announcement: id || '',
			},
		}
	);

	const {copy} = useCopy();

	const onShare = () => () =>
		copy(`${BASE_URL}/conversations/announcements/${id}`);

	return (
		<Container>
			<AnnouncementCardActionsReact
				announcement={announcement}
				setAnnouncement={setAnnouncement}
				likeMutationTuple={likeMT}
				dislikeMutationTuple={dislikeMT}
			/>
			<Link href={`/conversations/announcements/${id}`}>
				<Item>
					<Image src={comment} width={20} height={20} />
					<Side>
						<Text>{comments}</Text>
					</Side>
				</Item>
			</Link>
			<Link href={`/write/re-announce/${id}`}>
				<Item>
					<Image src={repeat} width={20} height={20} />
					<Side>
						<Text>{reAnnouncements}</Text>
					</Side>
				</Item>
			</Link>
			<Item>
				<SlideMessage
					action={onShare()}
					message="کپی شد!"
					view={<Image src={share} width={20} height={20} />}
				/>
			</Item>
		</Container>
	);
};
