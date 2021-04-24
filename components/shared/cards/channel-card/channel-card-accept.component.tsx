import React, {Dispatch, FC, SetStateAction} from 'react';
import {useMutation} from '@apollo/client';

import {
	ACCEPT_ADMIN_MUTATION,
	AcceptAdminMutationData,
	AcceptAdminMutationVariables,
} from '../../../../api';
import {useAuth} from '../../../../hooks';
import {Channel} from '../../../../types';
import {Button} from '../../native';
import {Color} from '../../../../data';

interface Props {
	channel: Channel;
	setChannel: Dispatch<SetStateAction<Channel>>;
	setLoading: Dispatch<SetStateAction<boolean>>;
	isLoading: boolean;
}

export const ChannelCardAccept: FC<Props> = ({
	channel: {id},
	setChannel,
	setLoading,
	isLoading,
}) => {
	const {token} = useAuth();

	const [acceptAdmin] = useMutation<
		AcceptAdminMutationData,
		AcceptAdminMutationVariables
	>(ACCEPT_ADMIN_MUTATION, {
		variables: {
			channel: id!,
		},
		context: {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	});

	const onAcceptClick = () => async () => {
		if (isLoading) return;

		setLoading(true);

		try {
			await acceptAdmin();

			setChannel(({myAdmin, ...channel}) => ({
				...channel,
				myAdmin: {
					...myAdmin,
					accepted: true,
				},
			}));
		} catch (error) {}

		setLoading(false);
	};

	return (
		<Button
			fill
			primary
			disabled={isLoading}
			onClick={onAcceptClick()}
			color={Color.GHOST_WHITE}>
			قبول کردن
		</Button>
	);
};
