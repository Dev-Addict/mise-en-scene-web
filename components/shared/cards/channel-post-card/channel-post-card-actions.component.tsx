import React, {FC, useState} from 'react';
import {useRouter} from 'next/router';
import styled from 'styled-components';

import {Channel, ChannelAdminPermission, Post} from '../../../../types';
import {Row} from '../../flex.component';
import {Button} from '../../native';
import {Color} from '../../../../data';
import {useAuth} from '../../../../hooks';
import {deletePost} from '../../../../helpers';

const Container = styled(Row)`
	width: 100%;
	margin-top: 10px;

	& > * {
		margin: 0 5px;
	}

	@media only screen and (max-width: 400px) {
		flex-direction: column;

		& > * {
			margin: 5px 0;
		}
	}
`;

interface Props {
	post: Post;
	channel: Channel;
	reload: () => void;
}

export const ChannelPostCardActions: FC<Props> = ({
	post: {id, adminData},
	channel: {handle, owner, myAdmin},
	reload,
}) => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);

	const {user, token} = useAuth();

	const isRemovable =
		owner === user?.id ||
		myAdmin?.id === adminData?.id ||
		myAdmin?.permissions?.includes(ChannelAdminPermission.DELETE_POST);

	const isEditable =
		owner === user?.id ||
		myAdmin?.id === adminData?.id ||
		myAdmin?.permissions?.includes(ChannelAdminPermission.EDIT_OTHERS_POST);

	const onDeleteClick = () => async () => {
		if (loading) return;

		setLoading(true);

		if (await deletePost(id || '', token)) await reload();

		setLoading(false);
	};
	const onLinkClick = (route: string) => async () => {
		if (loading) return;

		await router.push(route);
	};

	return (
		<Container>
			{isRemovable && (
				<Button
					flex={1}
					danger
					color={Color.GHOST_WHITE}
					disabled={loading}
					onClick={onDeleteClick()}>
					پاک کردن
				</Button>
			)}
			{isEditable && (
				<Button
					flex={1}
					primary
					color={Color.GHOST_WHITE}
					disabled={loading}
					onClick={onLinkClick(`/channels/${handle}/manage/post/${id}/edit`)}>
					ویرایش
				</Button>
			)}
			<Button
				flex={1}
				primary
				color={Color.GHOST_WHITE}
				disabled={loading}
				onClick={onLinkClick(`/channels/${handle}/manage/post/${id}/preview`)}>
				پیش نمایش
			</Button>
		</Container>
	);
};
