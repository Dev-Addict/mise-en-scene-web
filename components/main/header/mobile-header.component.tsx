import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import styled, {useTheme} from 'styled-components';
import {StyledProps, Theme} from '../../../types';
import Image from 'next/image';
import {Button, Filler} from '../../shared';
import Link from 'next/link';
import {Color} from '../../../data';

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
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export const MobileHeader: FC<Props> = ({isOpen, setOpen}) => {
	const {mode} = useTheme() as Theme;

	const onMenuBarClick = () => () => setOpen(true);
	const onCloseClick = () => () => setOpen(false);

	return (
		<>
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
		</>
	);
};
