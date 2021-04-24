import React, {FC} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled, {css} from 'styled-components';

import {useAuth, useThemeImage} from '../../../../hooks';
import {useMutation} from '@apollo/client';
import {
	REMOVE_ADMIN_MUTATION,
	RemoveAdminMutationData,
	RemoveAdminMutationVariables,
} from '../../../../api';
import {Channel, ChannelAdmin, ChannelAdminPermission} from '../../../../types';

const Container = styled.div`
	display: flex;
	flex-direction: row;

	& > * {
		margin: 0 5px;
	}

	& > *:first-child {
		margin-left: 0;
	}

	& > *:last-child {
		margin-right: 0;
	}
`;

interface ItemProps {
	disabled?: boolean;
}

const Item = styled.div<ItemProps>`
	width: 20px;
	height: 20px;
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;
		`}
`;

interface Props {
	channel: Channel;
	admin: ChannelAdmin;
}

export const AdminCardActions: FC<Props> = ({
	channel: {id, myAdmin, handle, owner},
	admin: {userData, permissions},
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
			channel: id || '',
			admin: myAdmin?.id || '',
		},
	});

	const isEditable =
		owner === user?.id ||
		(myAdmin?.permissions?.includes(
			ChannelAdminPermission.EDIT_ADMINS_PERMISSIONS
		) &&
			!permissions?.includes(ChannelAdminPermission.EDIT_ADMINS_PERMISSIONS) &&
			permissions?.every((permission) =>
				myAdmin?.permissions?.includes(permission)
			));
	const isRemovable =
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
