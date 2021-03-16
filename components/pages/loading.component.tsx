import Lottie from 'react-lottie';
import styled, {css, useTheme} from 'styled-components';

import {movieLoaderDark, movieLoaderLight} from '../../assets';
import {StyledProps, Theme, ThemeMode} from '../../types';
import {useAuth} from '../../hooks/auth.hook';

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

export const Loading = () => {
	const {mode} = useTheme() as Theme;
	const {isLoading} = useAuth();

	const animationData =
		mode === ThemeMode.LIGHT ? movieLoaderLight : movieLoaderDark;

	return (
		<Container isActive={isLoading}>
			<Lottie
				options={{
					autoplay: true,
					loop: true,
					animationData: animationData,
					rendererSettings: {
						preserveAspectRatio: 'xMidYMid slice',
					},
				}}
				width={200}
				height={200}
			/>
			<Title>میزانسن</Title>
			<Header>در حال بارگذاری...</Header>
		</Container>
	);
};