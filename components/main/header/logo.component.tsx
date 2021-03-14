import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

import {useThemeImage} from '../../../hooks';

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
	const logo = useThemeImage('/assets/logo/mes-$mode.svg');

	return (
		<Link href="/">
			<Container>
				<LogoContainer>
					<Image src={logo} width="60px" height="60px" />
				</LogoContainer>
				<HeaderText>میزانسن</HeaderText>
			</Container>
		</Link>
	);
};
