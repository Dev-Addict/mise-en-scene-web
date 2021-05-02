import React, {Dispatch, FC, SetStateAction} from 'react';
import {useRouter} from 'next/router';
import {useMutation} from '@apollo/client';

import {Control} from './channel-detail-components.component';
import {
	FOLLOW_CHANNEL_MUTATION,
	FollowChannelMutationData,
	FollowChannelMutationVariables,
	UNFOLLOW_CHANNEL_MUTATION,
	UnfollowChannelMutationData,
	UnfollowChannelMutationVariables,
} from '../../../../api';
import {useAuth} from '../../../../hooks';
import {Color} from '../../../../data';
import {Channel} from '../../../../types';

interface Props {
	channel: Channel;
	setChannel: Dispatch<SetStateAction<Channel | undefined>>;
}

export const ChannelFollowControl: FC<Props> = ({channel, setChannel}) => {
	const router = useRouter();
	const {asPath} = router;

	const {isSigned, token} = useAuth();

	const mutationOptions = {
		variables: {following: channel.id || ''},
		context: {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	};

	const [followChannel, {loading: followLoading}] = useMutation<
		FollowChannelMutationData,
		FollowChannelMutationVariables
	>(FOLLOW_CHANNEL_MUTATION, mutationOptions);
	const [unfollowChannel, {loading: unfollowLoading}] = useMutation<
		UnfollowChannelMutationData,
		UnfollowChannelMutationVariables
	>(UNFOLLOW_CHANNEL_MUTATION, mutationOptions);

	const onFollowClick = () => async () => {
		if (!isSigned) return await router.push(`/sign?callback=${asPath}`);

		try {
			await followChannel();

			setChannel({
				...channel,
				isFollowed: true,
				followers: (channel.followers || 0) + 1,
			});
		} catch (error) {}
	};

	const onUnfollowClick = () => async () => {
		try {
			await unfollowChannel();

			setChannel({
				...channel,
				followers: (channel.followers || 0) - 1,
				isFollowed: false,
			});
		} catch (error) {}
	};

	return (
		<Control
			primary={!channel.isFollowed}
			danger={channel.isFollowed}
			outline={channel.isFollowed}
			circular
			onClick={channel.isFollowed ? onUnfollowClick() : onFollowClick()}
			color={channel.isFollowed ? undefined : Color.GHOST_WHITE}
			disabled={channel.isFollowed ? unfollowLoading : followLoading}>
			{channel.isFollowed ? 'دنبال نکردن' : 'دنبال کردن'}
		</Control>
	);
};
