import React, {FC, useEffect, useState} from 'react';
import Link from 'next/link';

import {Announcement, Size} from '../../../../types';
import {Avatar, Gif, Images, Poll} from '../../view';
import {Text} from '../../text.component';
import {
	Body,
	Container,
	UserDetails,
} from './announcement-card-components.component';
import {useDate, useUserDisplayName} from '../../../../hooks';
import {AnnouncementCardActions} from './announcement-card-actions.component';

interface Props {
	announcement: Announcement;
	border?: boolean;
}

export const AnnouncementCard: FC<Props> = ({announcement, border = false}) => {
	const [localAnnouncement, setLocalAnnouncement] = useState(announcement);
	const {
		userData,
		text,
		reAnnouncementData,
		imagesData,
		gifData,
		pollData,
		publishedAt,
	} = localAnnouncement;

	const displayName = userData && useUserDisplayName(userData);
	const date = useDate(publishedAt);

	useEffect(() => {
		setLocalAnnouncement(announcement);
	}, [announcement]);

	const renderText = () =>
		text
			?.split('\n')
			?.map((text, index) =>
				text ? <Text key={index}>{text}</Text> : <Text>&nbsp;</Text>
			);

	return (
		<Container border={border}>
			<Avatar user={userData} size={100} />
			<Body border={!border}>
				<UserDetails>
					<Link href={`/users/${userData?.username || 'no'}`}>
						<Text size={Size.BIG} hover>
							{displayName}
						</Text>
					</Link>
					<Link href={`/users/${userData?.username || 'no'}`}>
						<Text size={Size.BIG} lowOpacity hover>
							@{userData?.username}
						</Text>
					</Link>
					<Text size={Size.BIG}>{date}</Text>
				</UserDetails>
				{renderText()}
				{reAnnouncementData && (
					<AnnouncementCard announcement={reAnnouncementData} border />
				)}
				{imagesData && <Images images={imagesData} />}
				{gifData && <Gif gif={gifData} />}
				{pollData && (
					<Poll poll={pollData} setAnnouncement={setLocalAnnouncement} />
				)}
				<AnnouncementCardActions
					announcement={localAnnouncement}
					setAnnouncement={setLocalAnnouncement}
				/>
			</Body>
		</Container>
	);
};
