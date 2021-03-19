import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import styled from 'styled-components';

import {Logo} from './logo.component';
import {ThemeSwitch} from './theme-switch.component';
import {MobileHeader} from './mobile-header.component';
import {ThemeMode} from '../../../types';
import {HeaderBody} from './header-body.component';
import {Sign} from './sign.component';

const Container = styled.div`
	padding: 10px 20px;
	display: flex;
	flex-direction: row;
	align-items: center;
	direction: rtl;
`;

const BodyFiller = styled.div`
	@media only screen and (max-width: 1000px) {
		flex: 1;
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
			<Sign />
			<MobileHeader isOpen={isOpen} setOpen={setOpen} />
		</Container>
	);
};
