import React, {FC} from 'react';
import {useRouter} from 'next/router';
import styled, {css} from 'styled-components';

import {Channel, Size} from '../../../../types';
import {Cover} from '../../view';
import {Text} from '../../text.component';
import {Button} from '../../native';
import {Color} from '../../../../data';
import {useAuth} from '../../../../hooks';

interface ContainerProps {
	verified?: boolean;
}

const Container = styled.div<ContainerProps>`
	margin: 10px;
	border-radius: 10px;
	border: 3px solid ${({theme: {error}}) => error};
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;

	${({verified, theme: {primary}}) =>
		verified &&
		css`
			border-color: ${primary};
		`}
`;

interface Props {
	channel: Channel;
	width: number;
}

export const ChannelCard: FC<Props> = ({
	channel: {verified, cover, name, handle, owner, admins},
	width,
}) => {
	const router = useRouter();

	const {user} = useAuth();

	const isOwnerOrAccepted =
		user?.id === owner ||
		admins?.find(({user: admin}) => admin === user?.id)?.accepted ||
		false;

	const onManageClick = () => () =>
		verified && router.push(`/channel/manage/${handle || 'no'}`);
	const onAcceptClick = () => () => {};

	return (
		<Container verified={verified}>
			<Cover
				src={`/image/channel/cover/${cover || 'default.svg'}`}
				size={150}
			/>
			<Text size={Size.HUGE} maxLines={1} width={width - 20}>
				{name}
			</Text>
			<Text lowOpacity maxLines={1} width={width - 20}>
				@{handle}
			</Text>
			{isOwnerOrAccepted ? (
				<Button
					primary
					fill
					disabled={!verified}
					onClick={onManageClick()}
					color={Color.GHOST_WHITE}>
					مدیریت
				</Button>
			) : (
				<Button
					primary
					fill
					disabled={!verified}
					onClick={onAcceptClick()}
					color={Color.GHOST_WHITE}>
					قبول کردن
				</Button>
			)}
		</Container>
	);
};
