import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled, {useTheme} from 'styled-components';

import {Routes} from './routes.component';
import {Logo} from './logo.component';
import {ThemeSwitch} from './theme-switch.component';
import {Button, Filler} from '../../shared';
import {StyledProps, Theme, ThemeMode} from '../../../types';
import {Color} from '../../../data';

const Container = styled.div`
	padding: 10px 20px;
	display: flex;
	flex-direction: row;
	align-items: center;
	direction: rtl;
`;

const HeaderText = styled.a`
	font-size: 20px;
	text-decoration: none;

	&:hover {
		opacity: 0.5;
	}
`;

interface BodyContainerProps {
	isOpen?: boolean;
}

const BodyContainer = styled.div<StyledProps & BodyContainerProps>`
	flex: 1;

	@media only screen and (max-width: 1000px) {
		background-color: ${({theme: {foreground}}) => foreground};
		position: fixed;
		top: 80px;
		left: ${({isOpen}) => (isOpen ? 0 : -100)}%;
		width: 100vw;
		height: 100vh;
	}
`;

const Body = styled.div<StyledProps>`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;

	@media only screen and (max-width: 1000px) {
		flex-direction: column;
		background-color: ${({theme: {background}}) => background}F3;
		width: 100vw;
		height: 100vh;

		& > * {
			flex: none;
		}
	}
`;

const BodyFiller = styled.div`
	@media only screen and (max-width: 1000px) {
		flex: 1;
	}
`;

const MagnifierContainer = styled.a<StyledProps>`
	margin: 0 10px;
	width: 25px;
	height: 25px;
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}

	@media only screen and (max-width: 1000px) {
		margin: 10px 0;
	}
`;

const SignButtonContainer = styled.a`
	margin-right: 10px;

	@media only screen and (max-width: 1000px) {
		display: none;
	}
`;

const MenuButtonContainer = styled.div`
	display: none;
	margin-right: 10px;
	width: 40px;
	height: 40px;

	&:hover {
		opacity: 0.5;
	}

	@media only screen and (max-width: 1000px) {
		display: block;
	}
`;

interface MobileHeaderContainerProps {
	isOpen?: boolean;
}

const MobileHeaderContainer = styled.div<
	StyledProps & MobileHeaderContainerProps
>`
	display: none;
	position: fixed;
	top: 0;
	left: ${({isOpen}) => (isOpen ? 0 : -100)}%;
	padding: 10px 20px;
	flex-direction: row;
	align-items: center;
	direction: rtl;
	height: 80px;
	width: 100vw;
	background-color: ${({theme: {background}}) => background};

	@media only screen and (max-width: 1000px) {
		display: flex;
	}
`;

const ArrowContainer = styled.div`
	width: 40px;
	height: 40px;

	&:hover {
		opacity: 0.5;
	}
`;

interface Props {
	setTheme: Dispatch<SetStateAction<ThemeMode>>;
}

export const Header: FC<Props> = ({setTheme}) => {
	const {mode} = useTheme() as Theme;

	const [isOpen, setOpen] = useState(false);

	const onMenuBarClick = () => () => setOpen(true);
	const onCloseClick = () => () => setOpen(false);

	return (
		<Container>
			<Logo />
			<Link href="/">
				<HeaderText>میزانسن</HeaderText>
			</Link>
			<BodyFiller />
			<BodyContainer isOpen={isOpen}>
				<Body>
					<Filler flex={1} minWidth={50} />
					<Routes />
					<Filler flex={5} minWidth={50} />
					<Link href="/search">
						<MagnifierContainer>
							<Image
								src={`/assets/icons/magnifier/magnifier-${mode.toLowerCase()}.svg`}
								width="25px"
								height="25px"
							/>
						</MagnifierContainer>
					</Link>
				</Body>
			</BodyContainer>
			<ThemeSwitch setTheme={setTheme} />
			<Link href="/sign-up">
				<SignButtonContainer>
					<Button circular color={Color.GHOST_WHITE} primary>
						ورود/ثبت نام
					</Button>
				</SignButtonContainer>
			</Link>
			<MenuButtonContainer onClick={onMenuBarClick()}>
				<Image
					src={`/assets/icons/menu/menu-bar-${mode.toLowerCase()}.svg`}
					width="40px"
					height="40px"
				/>
			</MenuButtonContainer>
			<MobileHeaderContainer isOpen={isOpen}>
				<ArrowContainer onClick={onCloseClick()}>
					<Image
						src={`/assets/icons/arrows/left/arrow-left-${mode.toLowerCase()}.svg`}
						width="40px"
						height="40px"
					/>
				</ArrowContainer>
				<Filler />
				<Link href="/sign-up">
					<Button circular color={Color.GHOST_WHITE} primary>
						ورود/ثبت نام
					</Button>
				</Link>
			</MobileHeaderContainer>
		</Container>
	);
};
