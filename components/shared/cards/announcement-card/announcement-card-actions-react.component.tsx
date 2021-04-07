import React, {Dispatch, FC, SetStateAction} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {MutationTuple} from '@apollo/client';

import {Text} from '../../text.component';
import {Item, Side} from './announcment-card-actions-components.component';
import {
	DislikeMutationData,
	DislikeMutationVariables,
	LikeMutationData,
	LikeMutationVariables,
} from '../../../../api';
import {useAuth, useThemeImage} from '../../../../hooks';
import {Announcement} from '../../../../types';

enum Reaction {
	LIKE = 'LIKE',
	DISLIKE = 'DISLIKE',
}

interface Props {
	setAnnouncement: Dispatch<SetStateAction<Announcement>>;
	announcement: Announcement;
	likeMutationTuple: MutationTuple<LikeMutationData, LikeMutationVariables>;
	dislikeMutationTuple: MutationTuple<
		DislikeMutationData,
		DislikeMutationVariables
	>;
}

export const AnnouncementCardActionsReact: FC<Props> = ({
	setAnnouncement,
	announcement: {
		like: likeNumber = 0,
		dislike: dislikeNumber = 0,
		isLiked,
		isDisliked,
	},
	likeMutationTuple: [likeMutation, {loading: likeLoading}],
	dislikeMutationTuple: [dislikeMutation, {loading: dislikeLoading}],
}) => {
	const router = useRouter();
	const {asPath} = router;

	const like = useThemeImage('/assets/icons/like/like-$mode.svg');
	const likeFill = useThemeImage('/assets/icons/like-fill/like-fill-$mode.svg');

	const {token, isSigned} = useAuth();

	const onReact = (reaction: Reaction) => async () => {
		if (likeLoading || dislikeLoading) return;

		if (!isSigned) await router.push(`/sign?callback=${asPath}`);

		try {
			await (reaction === Reaction.LIKE ? likeMutation : dislikeMutation)({
				context: {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			});

			setAnnouncement((announcement) => ({
				...announcement,
				like: likeNumber + (isLiked ? -1 : reaction === Reaction.LIKE ? 1 : 0),
				dislike:
					dislikeNumber +
					(isDisliked ? -1 : reaction === Reaction.DISLIKE ? 1 : 0),
				isLiked: reaction === Reaction.LIKE && !isLiked,
				isDisliked: reaction === Reaction.DISLIKE && !isDisliked,
			}));
		} catch (error) {}
	};

	return (
		<>
			<Item
				disabled={likeLoading || dislikeLoading}
				onClick={onReact(Reaction.LIKE)}>
				<Image src={isLiked ? likeFill : like} width={30} height={30} />
				<Side>
					<Text>{likeNumber}</Text>
				</Side>
			</Item>
			<Item
				reverse
				disabled={dislikeLoading || likeLoading}
				onClick={onReact(Reaction.DISLIKE)}>
				<Image src={isDisliked ? likeFill : like} width={30} height={30} />
				<Side>
					<Text>{dislikeNumber}</Text>
				</Side>
			</Item>
		</>
	);
};
