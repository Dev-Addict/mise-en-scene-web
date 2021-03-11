import React, {Dispatch, FC, SetStateAction} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled, {useTheme} from 'styled-components';

import {Routes} from './routes.component';
import {Logo} from './logo.component';
import {ThemeSwitch} from './theme-switch.component';
import {Button, Filler} from '../../shared';
import {Theme, ThemeMode} from '../../../types';
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

const MagnifierContainer = styled.a`
	margin: 0 10px;
	width: 25px;
	height: 25px;
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}
`;

interface Props {
	setTheme: Dispatch<SetStateAction<ThemeMode>>;
}

export const Header: FC<Props> = ({setTheme}) => {
	const {mode} = useTheme() as Theme;

	return (
		<Container>
			<Logo />
			<Link href="/">
				<HeaderText>میزانسن</HeaderText>
			</Link>
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
			<ThemeSwitch setTheme={setTheme} />
			<Link href="/sign-up">
				<Button
					circular
					color={Color.GHOST_WHITE}
					primary
					style={{
						marginRight: 10,
					}}>
					ورود/ثبت نام
				</Button>
			</Link>
		</Container>
	);
};
