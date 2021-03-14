import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import {Logo} from './logo.component';
import {ThemeSwitch} from './theme-switch.component';
import {MobileHeader} from './mobile-header.component';
import {Button} from '../../shared';
import {ThemeMode} from '../../../types';
import {Color} from '../../../data';
import {HeaderBody} from './header-body.component';

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
			<Link href="/sign">
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
