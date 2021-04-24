import React, {Dispatch, FC, SetStateAction} from 'react';
import {useMutation} from '@apollo/client';

import {
	REJECT_ADMIN_MUTATION,
	RejectAdminMutationData,
	RejectAdminMutationVariables,
} from '../../../../api';
import {useAuth} from '../../../../hooks';
import {Channel} from '../../../../types';
import {Button} from '../../native';

interface Props {
	channel: Channel;
	setChannel: Dispatch<SetStateAction<Channel>>;
	setLoading: Dispatch<SetStateAction<boolean>>;
	isLoading: boolean;
}

export const ChannelCardReject: FC<Props> = ({
	channel: {id},
	setChannel,
	setLoading,
	isLoading,
}) => {
	const {token} = useAuth();

	const [rejectAdmin] = useMutation<
		RejectAdminMutationData,
		RejectAdminMutationVariables
	>(REJECT_ADMIN_MUTATION, {
		variables: {
			channel: id!,
		},
		context: {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	});

	const onRejectClick = () => async () => {
		if (isLoading) return;

		setLoading(true);

		try {
			await rejectAdmin();

			setChannel(({...channel}) => ({
				...channel,
				myAdmin: null,
			}));
		} catch (error) {}

		setLoading(false);
	};

	return (
		<Button fill danger disabled={isLoading} onClick={onRejectClick()} outline>
			رد کردن
		</Button>
	);
};
