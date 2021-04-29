import React, {FC} from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import {Text} from '../../shared';
import {useErrorValue, useWindowSize} from '../../../hooks';
import {Size} from '../../../types';

interface ContainerProps {
	height: number;
}

const Container = styled.div<ContainerProps>`
	display: flex;
	flex-direction: row;
	align-items: center;
	height: ${({height}) => height - 80}px;

	@media only screen and (max-width: 600px) {
		flex-direction: column-reverse;
	}
`;

const Message = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 20px;

	@media only screen and (max-width: 600px) {
		justify-content: normal;
	}
`;

const Illustration = styled.div`
	flex: 1;
	margin: 100px 100px 100px 20px;
	display: flex;
	justify-content: center;
	align-items: center;

	@media only screen and (max-width: 600px) {
		margin: 20px;
	}
`;

interface Props {
	code: number;
	title?: string;
}

export const ErrorMessage: FC<Props> = ({code, title}) => {
	const {height, width} = useWindowSize();

	const size = Math.min(
		height > 600 ? height - 200 : height / 2 - 40,
		width - (width > 600 ? 120 : 40)
	);

	const {image, message} = useErrorValue(code, title);

	return (
		<Container height={height}>
			<Message>
				<Text text={message} size={Size.HUGE} />
			</Message>
			<Illustration>
				<Image src={image} width={size} height={size} />
			</Illustration>
		</Container>
	);
};
