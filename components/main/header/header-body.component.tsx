import styled from 'styled-components';

import {StyledProps} from '../../../types';
import {Filler} from '../../shared';
import {Routes} from './routes.component';
import Link from 'next/link';
import Image from 'next/image';
import React, {Dispatch, FC, SetStateAction} from 'react';
import {useThemeImage} from '../../../hooks';

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
		z-index: 100;
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

interface Props {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export const HeaderBody: FC<Props> = ({isOpen, setOpen}) => {
	const magnifier = useThemeImage(
		'/assets/icons/magnifier/magnifier-$mode.svg'
	);

	return (
		<BodyContainer isOpen={isOpen}>
			<Body>
				<Filler flex={1} minWidth={50} />
				<Routes setOpen={setOpen} />
				<Filler flex={5} minWidth={50} />
				<Link href="/search">
					<MagnifierContainer>
						<Image src={magnifier} width="25px" height="25px" />
					</MagnifierContainer>
				</Link>
			</Body>
		</BodyContainer>
	);
};
