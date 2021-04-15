import React, {FC, useEffect, useState} from 'react';
import Link from 'next/link';

import {Announcement} from '../../../../types';
import {Avatar, Gif, Images, Poll} from '../../view';
import {Text} from '../../text.component';
import {
	Body,
	Container,
	SideAvatar,
	SmallAvatar,
	Time,
	UserDetails,
} from './announcement-card-components.component';
import {useDate, useUserDisplayName, useWindowSize} from '../../../../hooks';
import {AnnouncementCardActions} from './announcement-card-actions.component';

interface Props {
	announcement: Announcement;
	border?: boolean;
	reAnnouncement?: boolean;
}

export const AnnouncementCard: FC<Props> = ({
	announcement,
	border = false,
	reAnnouncement = false,
}) => {
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

	const {width} = useWindowSize();

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
			<SideAvatar>
				<Avatar user={userData} size={80} />
			</SideAvatar>
			<Body border={!border} reAnnouncement={reAnnouncement}>
				<UserDetails width={width} reAnnouncement={reAnnouncement}>
					<SmallAvatar>
						<Avatar user={userData} size={50} />
					</SmallAvatar>
					<Link href={`/users/${userData?.username || 'no'}`}>
						<Text hover>{displayName}</Text>
					</Link>
					<Link href={`/users/${userData?.username || 'no'}`}>
						<Text lowOpacity hover>
							@{userData?.username}
						</Text>
					</Link>
					<Time>{date}</Time>
				</UserDetails>
				{renderText()}
				{reAnnouncementData && (
					<AnnouncementCard
						announcement={reAnnouncementData}
						border
						reAnnouncement
					/>
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
