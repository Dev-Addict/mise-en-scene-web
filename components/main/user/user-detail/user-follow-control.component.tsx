import React, {Dispatch, FC, SetStateAction} from 'react';
import {useRouter} from 'next/router';
import {useMutation} from '@apollo/client';

import {Control} from './user-detail-components.component';
import {
	FindUserQueryDataFindUser,
	FOLLOW_MUTATION,
	FollowMutationData,
	FollowMutationVariables,
	UNFOLLOW_MUTATION,
	UnfollowMutationData,
	UnfollowMutationVariables,
} from '../../../../api';
import {useAuth} from '../../../../hooks';
import {Color} from '../../../../data';

interface Props {
	user: FindUserQueryDataFindUser;
	setUser: Dispatch<SetStateAction<FindUserQueryDataFindUser | undefined>>;
}

export const UserFollowControl: FC<Props> = ({user, setUser}) => {
	const router = useRouter();
	const {asPath} = router;

	const {isSigned, token} = useAuth();

	const [follow, {loading: followLoading}] = useMutation<
		FollowMutationData,
		FollowMutationVariables
	>(FOLLOW_MUTATION);
	const [unfollow, {loading: unfollowLoading}] = useMutation<
		UnfollowMutationData,
		UnfollowMutationVariables
	>(UNFOLLOW_MUTATION);

	const onFollowClick = () => async () => {
		if (!isSigned) return await router.push(`/sign?callback=${asPath}`);

		try {
			await follow({
				variables: {following: user.id},
				context: {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			});

			setUser({
				...user,
				followers: user.followers + 1,
				isFollowed: true,
			});
		} catch (error) {}
	};

	const onUnfollowClick = () => async () => {
		try {
			await unfollow({
				variables: {following: user.id},
				context: {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			});

			setUser({
				...user,
				followers: user.followers - 1,
				isFollowed: false,
			});
		} catch (error) {}
	};

	return (
		<Control
			color={Color.GHOST_WHITE}
			primary={!user.isFollowed}
			danger={user.isFollowed}
			outline={user.isFollowed}
			circular
			onClick={user.isFollowed ? onUnfollowClick() : onFollowClick()}
			disabled={user.isFollowed ? unfollowLoading : followLoading}>
			{user.isFollowed ? 'دنبال نکردن' : 'دنبال کردن'}
		</Control>
	);
};
