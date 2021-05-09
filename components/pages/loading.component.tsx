import React, {FC} from 'react';
import styled, {css, useTheme} from 'styled-components';

import {movieLoaderDark, movieLoaderLight} from '../../assets';
import {StyledProps, Theme, ThemeMode} from '../../types';
import {Animation} from '../shared';
import {OpenModalStyle} from '../style';

interface ContainerProps {
	isActive?: boolean;
}

const Container = styled.div<StyledProps & ContainerProps>`
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0;
	right: 100vw;
	bottom: 0;
	left: -100vw;
	background-color: ${({theme: {background}}) => background};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 1000;

	${({isActive}) =>
		isActive &&
		css`
			left: 0;
			right: 0;
		`}
`;

const Title = styled.div`
	font-size: 28px;
	direction: rtl;
	margin: 30px 0 0 0;
`;

const Header = styled.div`
	font-size: 20px;
	direction: rtl;
	margin: 20px 0;
`;

interface Props {
	active?: boolean;
}

export const Loading: FC<Props> = ({active}) => {
	const {mode} = useTheme() as Theme;

	const animationData =
		mode === ThemeMode.LIGHT ? movieLoaderLight : movieLoaderDark;

	return (
		<Container isActive={active}>
			<OpenModalStyle open={active} />
			<Animation data={animationData} />
			<Title>میزانسن</Title>
			<Header>در حال بارگذاری...</Header>
		</Container>
	);
};
