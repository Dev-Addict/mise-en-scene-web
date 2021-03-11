import React, {FC, useState} from 'react';
import Link from 'next/link';
import styled, {css} from 'styled-components';

import {BottomPointer, TopPointer} from './pointers.component';

interface RouteProps {
	active?: boolean;
}

const Container = styled.a<RouteProps>`
	display: block;
	margin: 0 20px;
	padding: 0 5px;
	font-size: 16px;
	cursor: pointer;
	transition: all 336ms;
	position: relative;
	text-decoration: none;

	&:hover {
		opacity: 0.7;
	}

	@media only screen and (max-width: 1000px) {
		text-align: center;
		font-size: 24px;
		margin: 8px 0;
		width: 100%;

		&:hover {
			background-color: ${({theme: {accent}}) => accent}B3;
		}

		${({active}) =>
			active &&
			css`
				background-color: ${({theme: {accent}}) => accent}B3;
			`}
	}
`;

interface Props {
	name: string;
	path: string;
	activePath: string;
}

export const Route: FC<Props> = ({path, name, activePath}) => {
	const [isHovered, setHovered] = useState(false);

	const onMouseEnter = () => () => setHovered(true);
	const onMouseLeave = () => () => setHovered(false);

	return (
		<Link href={path} key={path}>
			<Container
				onMouseEnter={onMouseEnter()}
				onMouseLeave={onMouseLeave()}
				active={activePath === path}>
				<TopPointer active={activePath === path || isHovered} />
				<BottomPointer active={activePath === path || isHovered} />
				{name}
			</Container>
		</Link>
	);
};
