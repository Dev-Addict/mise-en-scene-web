import React, {FC} from 'react';
import Link from 'next/link';

import {A} from '../../a.component';
import {useUserDisplayName} from '../../../../hooks';
import {Notification, NotificationType} from '../../../../types';

interface Props {
	notification: Notification;
}

export const NotificationMessage: FC<Props> = ({
	notification: {type, userData, announcementData},
}) => {
	const displayName = useUserDisplayName(userData || {});

	switch (type) {
		case NotificationType.UNFOLLOW:
			return (
				<>
					<Link href={`/users/${userData?.username || 'no'}`}>
						<A>{displayName}</A>
					</Link>{' '}
					دیگر شما را دنبال نمی کند!
				</>
			);
		case NotificationType.FOLLOW:
			return (
				<>
					<Link href={`/users/${userData?.username || 'no'}`}>
						<A>{displayName}</A>
					</Link>{' '}
					آغاز به دنبال کردن شما کرد!
				</>
			);
		case NotificationType.COMMENT:
			return (
				<>
					<Link href={`/users/${userData?.username || 'no'}`}>
						<A>{displayName}</A>
					</Link>{' '}
					روی{' '}
					<Link href={`/conversations/announcements/${announcementData?.id}`}>
						<A>گفت و گوی شما</A>
					</Link>{' '}
					نظر داد!
				</>
			);
		case NotificationType.RE_ANNOUNCEMENT:
			return (
				<>
					<Link href={`/users/${userData?.username || 'no'}`}>
						<A>{displayName}</A>
					</Link>{' '}
					<Link href={`/conversations/announcements/${announcementData?.id}`}>
						<A>گفت و گوی شما</A>
					</Link>{' '}
					بازگو کرد!
				</>
			);
		case NotificationType.LIKE:
			return (
				<>
					<Link href={`/users/${userData?.username || 'no'}`}>
						<A>{displayName}</A>
					</Link>{' '}
					<Link href={`/conversations/announcements/${announcementData?.id}`}>
						<A>گفت و گوی شما</A>
					</Link>{' '}
					را پسندید!
				</>
			);
		case NotificationType.DISLIKE:
			return (
				<>
					<Link href={`/users/${userData?.username || 'no'}`}>
						<A>{displayName}</A>
					</Link>{' '}
					<Link href={`/conversations/announcements/${announcementData?.id}`}>
						<A>گفت و گوی شما</A>
					</Link>{' '}
					را نپسندید!
				</>
			);
		default:
			return <></>;
	}
};
