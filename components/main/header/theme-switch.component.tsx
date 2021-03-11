import React, {Dispatch, FC, SetStateAction} from 'react';
import Image from 'next/image';
import styled, {css} from 'styled-components';

import {StyledProps, ThemeMode} from '../../../types';
import Cookie from 'js-cookie';

const Container = styled.div`
	margin: 0 10px;
`;

const Switch = styled.div<StyledProps>`
	background-color: ${({theme: {foreground}}) => foreground}66;
	width: 50px;
	height: 24px;
	border-radius: 12px;
	position: relative;
`;

const SelectedMode = styled.div<StyledProps>`
	background-color: ${({theme: {foreground}}) => foreground}33;
	position: absolute;
	width: 22px;
	height: 22px;
	top: 1px;
	border-radius: 11px;

	${({theme: {mode}}) =>
		mode === ThemeMode.LIGHT
			? css`
					left: 1px;
			  `
			: css`
					right: 1px;
			  `}
`;

const IconContainer = styled.div`
	position: absolute;
	width: 16px;
	height: 16px;
	top: 4px;
	cursor: pointer;

	& image {
		width: 16px;
		height: 16px;
	}

	&:hover {
		opacity: 0.5;
		transform: scale(1.1);
	}
`;

const SunIconContainer = styled(IconContainer)`
	left: 4px;
`;

const MoonIconContainer = styled(IconContainer)`
	right: 4px;
`;

interface Props {
	setTheme: Dispatch<SetStateAction<ThemeMode>>;
}

export const ThemeSwitch: FC<Props> = ({setTheme}) => {
	const onIconClick = (mode: ThemeMode) => () => {
		Cookie.set('theme', mode);
		setTheme(mode);
	};

	return (
		<Container>
			<Switch>
				<SelectedMode />
				<SunIconContainer onClick={onIconClick(ThemeMode.LIGHT)}>
					<Image src="/assets/icons/sun.svg" width="16px" height="16px" />
				</SunIconContainer>
				<MoonIconContainer onClick={onIconClick(ThemeMode.DARK)}>
					<Image src="/assets/icons/moon.svg" width="16px" height="16px" />
				</MoonIconContainer>
			</Switch>
		</Container>
	);
};
