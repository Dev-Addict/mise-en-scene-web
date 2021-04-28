import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import {Text} from '../shared';
import {useThemeImage, useWindowSize} from '../../hooks';
import {Size} from '../../types';

interface ContainerProps {
	minHeight?: number;
}

const Container = styled.div<ContainerProps>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: ${({minHeight}) => minHeight || 1000}px;
	padding: 10px;
`;

const ImageContainer = styled.div`
	width: 50%;
	height: 100%;
	max-width: 700px;
	margin-bottom: 20px;

	@media only screen and (max-width: 1200px) {
		width: 60%;
	}

	@media only screen and (max-width: 900px) {
		width: 70%;
	}

	@media only screen and (max-width: 700px) {
		width: 80%;
	}

	@media only screen and (max-width: 500px) {
		width: 90%;
	}
`;

export const ComingSoon = () => {
	const construction = useThemeImage(
		'/assets/illustrations/construction/construction-$mode.svg'
	);

	const {height} = useWindowSize();

	return (
		<Container minHeight={height - 80}>
			<ImageContainer>
				<Image src={construction} width={1625} height={1000} />
			</ImageContainer>
			<Text size={Size.MASSIVE} text="به زودی..." />
		</Container>
	);
};
