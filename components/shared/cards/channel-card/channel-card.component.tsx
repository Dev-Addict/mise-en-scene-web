import React, {FC} from 'react';
import {useRouter} from 'next/router';
import styled, {css} from 'styled-components';

import {Channel, Size} from '../../../../types';
import {Cover} from '../../view';
import {Text} from '../../text.component';
import {Button} from '../../native';
import {Color} from '../../../../data';

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
	channel: {verified, cover, name, handle},
	width,
}) => {
	const router = useRouter();

	const onManageClick = () => () =>
		verified && router.push(`/channel/manage/${handle || 'no'}`);

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
			<Button
				primary
				fill
				disabled={!verified}
				onClick={onManageClick()}
				color={Color.GHOST_WHITE}>
				مدیریت
			</Button>
		</Container>
	);
};
