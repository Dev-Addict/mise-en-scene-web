import React, {FC, useState} from 'react';
import Image from 'next/image';
import styled, {css} from 'styled-components';
import {useAnnouncements, useAuth} from '../../../../hooks';
import {Announcement} from '../../../../types';
import {deleteAnnouncement} from '../../../../helpers';

interface DeleteProps {
	disabled?: boolean;
}

const Delete = styled.div<DeleteProps>`
	width: 15px;
	height: 15px;
	cursor: pointer;
	margin-right: 5px;

	&:hover {
		opacity: 0.5;
	}

	${({disabled}) =>
		disabled &&
		css`
			cursor: default;
			opacity: 0.5;
		`}
`;

interface Props {
	announcement: Announcement;
}

export const AnnouncementCardDelete: FC<Props> = ({
	announcement: {userData, id},
}) => {
	const [loading, setLoading] = useState(false);

	const {reload} = useAnnouncements();

	const {user, token} = useAuth();

	const isMine = user?.id === userData?.id;

	const onDeleteClick = () => async () => {
		if (loading) return;

		setLoading(true);

		if (await deleteAnnouncement(id, token)) await reload();

		setLoading(false);
	};

	return (
		<>
			{isMine && (
				<Delete onClick={onDeleteClick()} disabled={loading}>
					<Image src={'/assets/icons/close/close.svg'} width={15} height={15} />
				</Delete>
			)}
		</>
	);
};
