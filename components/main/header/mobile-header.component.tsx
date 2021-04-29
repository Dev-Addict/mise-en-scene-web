import React, {Dispatch, FC, SetStateAction} from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import {Sign} from './sign.component';
import {useThemeImage} from 'hooks';
import {StyledProps} from 'types';
import {OpenModalStyle, Filler} from 'components';
import {Notifications} from './notifications.component';

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
	sign?: boolean;
}

export const MobileHeader: FC<Props> = ({isOpen, setOpen, sign = true}) => {
	const menuBar = useThemeImage('/assets/icons/menu/menu-bar-$mode.svg');
	const arrowLeft = useThemeImage(
		'/assets/icons/arrows/left/arrow-left-$mode.svg'
	);

	const onMenuBarClick = () => () => setOpen(true);
	const onCloseClick = () => () => setOpen(false);

	return (
		<>
			<OpenModalStyle open={isOpen} />
			<MenuButtonContainer onClick={onMenuBarClick()}>
				<Image src={menuBar} width="40px" height="40px" />
			</MenuButtonContainer>
			<MobileHeaderContainer isOpen={isOpen}>
				<ArrowContainer onClick={onCloseClick()}>
					<Image src={arrowLeft} width="40px" height="40px" />
				</ArrowContainer>
				<Filler />
				<Notifications mobile />
				{sign && <Sign mobile />}
			</MobileHeaderContainer>
		</>
	);
};
