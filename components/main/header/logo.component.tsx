import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled, {useTheme} from 'styled-components';

import {Theme} from '../../../types';

const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const LogoContainer = styled.a`
	width: 60px;
	height: 60px;
	cursor: pointer;

	& > img {
		width: 60px;
		height: 60px;
	}

	&:hover {
		opacity: 0.5;
	}
`;

const HeaderText = styled.a`
	font-size: 20px;
	text-decoration: none;
	margin-right: 10px;

	&:hover {
		opacity: 0.5;
	}
`;

export const Logo = () => {
	const theme = useTheme() as Theme;

	return (
		<Link href="/">
			<Container>
				<LogoContainer>
					<Image
						src={`/assets/logo/mes-${theme.mode.toLowerCase()}.svg`}
						width="60px"
						height="60px"
					/>
				</LogoContainer>
				<HeaderText>میزانسن</HeaderText>
			</Container>
		</Link>
	);
};
