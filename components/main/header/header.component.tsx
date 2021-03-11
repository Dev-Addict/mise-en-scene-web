import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled, {useTheme} from 'styled-components';

import {Routes} from './routes.component';
import {Logo} from './logo.component';
import {ThemeSwitch} from './theme-switch.component';
import {MobileHeader} from './mobile-header.component';
import {Button, Filler} from '../../shared';
import {StyledProps, Theme, ThemeMode} from '../../../types';
import {Color} from '../../../data';
import {HeaderBody} from './header-body.component';

const Container = styled.div`
	padding: 10px 20px;
	display: flex;
	flex-direction: row;
	align-items: center;
	direction: rtl;
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

const SignButtonContainer = styled.a`
	margin-right: 10px;

	@media only screen and (max-width: 1000px) {
		display: none;
	}
`;

interface Props {
	setTheme: Dispatch<SetStateAction<ThemeMode>>;
}

export const Header: FC<Props> = ({setTheme}) => {
	const [isOpen, setOpen] = useState(false);

	return (
		<Container>
			<Logo />
			<BodyFiller />
			<HeaderBody isOpen={isOpen} />
			<ThemeSwitch setTheme={setTheme} />
			<Link href="/sign-up">
				<SignButtonContainer>
					<Button circular color={Color.GHOST_WHITE} primary>
						ورود/ثبت نام
					</Button>
				</SignButtonContainer>
			</Link>
			<MobileHeader isOpen={isOpen} setOpen={setOpen} />
		</Container>
	);
};
