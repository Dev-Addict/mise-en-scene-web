import React, {FC, useRef} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styled, {css} from 'styled-components';

import {useComponentSize, useThemeImage} from '../../../hooks';
import {StyledProps} from '../../../types';
import {Color} from '../../../data';
import {Meta} from '../../pages';

const Container = styled.div`
	position: relative;
	margin: 2px 0;
	padding: 10px;
`;

const Icon = styled.div`
	width: 30px;
	height: 30px;
	min-width: 30px;
	min-height: 30px;
`;

interface NameContainerProps {
	active?: boolean;
	hiddenWidth?: number;
}

const NameContainer = styled.div<StyledProps & NameContainerProps>`
	position: absolute;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 10px;
	top: 0;
	left: 0;
	width: 50px;
	height: 50px;
	overflow: hidden;
	border-radius: 25px;
	cursor: pointer;

	&:hover {
		width: ${({hiddenWidth}) => 60 + (hiddenWidth || 0)}px;
		background-color: ${({theme: {link}}) => link};
	}

	${({active, theme: {link}}) =>
		active &&
		css`
			background-color: ${link}88;
		`}
`;

const Name = styled.div<StyledProps>`
	margin: 0 10px;
	white-space: nowrap;
	color: ${Color.GHOST_WHITE};
`;

interface Props {
	icon: string;
	name: string;
	route: string;
}

export const DashboardRoute: FC<Props> = ({icon, name, route}) => {
	const themeIcon = useThemeImage(icon);

	const router = useRouter();
	const {asPath} = router;

	const nameRef = useRef<HTMLDivElement>(null);

	const {width: nameWidth} = useComponentSize(nameRef);

	const active = asPath === route;

	return (
		<Container>
			{active && <Meta title={name} />}
			<Icon>
				<Image src={themeIcon} width={30} height={30} />
			</Icon>
			<Link href={route}>
				<NameContainer active={active} hiddenWidth={nameWidth}>
					<Icon>
						<Image src={themeIcon} width={30} height={30} />
					</Icon>
					<Name ref={nameRef}>{name}</Name>
				</NameContainer>
			</Link>
		</Container>
	);
};
