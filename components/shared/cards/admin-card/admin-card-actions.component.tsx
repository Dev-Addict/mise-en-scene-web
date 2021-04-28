import React, {FC} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useMutation} from '@apollo/client';

import {Container, Item} from './admin-card-actions-components.component';
import {useAuth, useThemeImage} from '../../../../hooks';
import {
	REMOVE_ADMIN_MUTATION,
	RemoveAdminMutationData,
	RemoveAdminMutationVariables,
} from '../../../../api';
import {Channel, ChannelAdmin, ChannelAdminPermission} from '../../../../types';

interface Props {
	channel: Channel;
	admin: ChannelAdmin;
	reload: () => void;
}

export const AdminCardActions: FC<Props> = ({
	channel: {id: channel, myAdmin, handle, owner},
	admin: {userData, permissions, id},
	reload,
}) => {
	const close = useThemeImage('/assets/icons/close/close-$mode.svg');
	const edit = useThemeImage('/assets/icons/edit/edit-$mode.svg');

	const {user, token} = useAuth();

	const [removeAdmin, {loading}] = useMutation<
		RemoveAdminMutationData,
		RemoveAdminMutationVariables
	>(REMOVE_ADMIN_MUTATION, {
		context: {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
		variables: {
			channel: channel || '',
			admin: id || '',
		},
	});

	const isEditable =
		user?.id !== id ||
		owner === user?.id ||
		(myAdmin?.permissions?.includes(
			ChannelAdminPermission.EDIT_ADMINS_PERMISSIONS
		) &&
			!permissions?.includes(ChannelAdminPermission.EDIT_ADMINS_PERMISSIONS) &&
			permissions?.every((permission) =>
				myAdmin?.permissions?.includes(permission)
			));
	const isRemovable =
		user?.id !== id ||
		owner === user?.id ||
		(myAdmin?.permissions?.includes(ChannelAdminPermission.DELETE_ADMIN) &&
			!permissions?.includes(ChannelAdminPermission.DELETE_ADMIN) &&
			permissions?.every((permission) =>
				myAdmin?.permissions?.includes(permission)
			));

	const onRemoveClick = () => async () => {
		if (loading) return;

		try {
			await removeAdmin();

			await reload();
		} catch (error) {}
	};

	return (
		<Container>
			{isEditable && (
				<Link
					href={`/channels/${handle}/manage/admins/${userData?.username}/edit`}>
					<Item disabled={loading}>
						<Image src={edit} width={20} height={20} />
					</Item>
				</Link>
			)}
			{isRemovable && (
				<Item disabled={loading} onClick={onRemoveClick()}>
					<Image src={close} width={20} height={20} />
				</Item>
			)}
		</Container>
	);
};
