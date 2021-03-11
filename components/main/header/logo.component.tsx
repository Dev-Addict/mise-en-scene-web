import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled, {useTheme} from 'styled-components';

import {Theme} from '../../../types';

const Container = styled.a`
	margin-left: 10px;
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

export const Logo = () => {
	const theme = useTheme() as Theme;

	return (
		<Link href="/">
			<Container>
				<Image
					src={`/assets/logo/mes-${theme.mode.toLowerCase()}.svg`}
					width="60px"
					height="60px"
				/>
			</Container>
		</Link>
	);
};
