import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import styled, {css} from 'styled-components';

import {Logo} from './logo.component';
import {ThemeSwitch} from './theme-switch.component';
import {MobileHeader} from './mobile-header.component';
import {ThemeMode} from '../../../types';
import {HeaderBody} from './header-body.component';
import {Sign} from './sign.component';

interface ContainerProps {
	sign?: boolean;
}

const Container = styled.div<ContainerProps>`
	padding: 10px 20px;
	display: flex;
	flex-direction: row;
	align-items: center;
	direction: rtl;

	${({sign = true}) =>
		!sign &&
		css`
			padding: 10px 20px 10px 0;
		`}
`;

const BodyFiller = styled.div`
	@media only screen and (max-width: 1000px) {
		flex: 1;
	}
`;

interface Props {
	setTheme: Dispatch<SetStateAction<ThemeMode>>;
	sign?: boolean;
}

export const Header: FC<Props> = ({setTheme, sign = true}) => {
	const [isOpen, setOpen] = useState(false);

	return (
		<Container sign={sign}>
			<Logo />
			<BodyFiller />
			<HeaderBody isOpen={isOpen} setOpen={setOpen} />
			<ThemeSwitch setTheme={setTheme} />
			{sign && <Sign />}
			<MobileHeader isOpen={isOpen} setOpen={setOpen} sign={sign} />
		</Container>
	);
};
