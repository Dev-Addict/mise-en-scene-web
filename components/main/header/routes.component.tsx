import React, {useState} from 'react';
import Link from 'next/link';
import styled, {css} from 'styled-components';

import {headerRoutes} from '../../../data';
import {useRouter} from 'next/router';
import {StyledProps, Theme} from '../../../types';

const Container = styled.div<StyledProps>`
	display: flex;
	flex-direction: row;
	align-items: center;

	@media only screen and (max-width: 1000px) {
		width: 100%;
		flex-direction: column;
	}
`;

interface RouteProps {
	active?: boolean;
}

const Route = styled.a<RouteProps>`
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

interface PointerProps {
	active?: boolean;
	theme: Theme;
}

const Pointer = styled.div<PointerProps>`
	position: absolute;
	width: 15px;
	height: 15px;
	border: 2px solid ${({theme: {accent}}) => accent};
	transition: all 336ms;

	@media only screen and (max-width: 1000px) {
		display: none;
	}

	${({active}) =>
		!active &&
		css`
			opacity: 0;
		`}
`;

const TopPointer = styled(Pointer)`
	border-right: none;
	border-bottom: none;
	left: -5px;
	top: 0;
`;

const BottomPointer = styled(Pointer)`
	border-top: none;
	border-left: none;
	right: -5px;
	bottom: 0;
`;

export const Routes = () => {
	const {pathname} = useRouter();

	const activeRoutes = headerRoutes.filter(({path}) =>
		pathname.startsWith(path)
	);
	const activeRoute = activeRoutes[activeRoutes.length - 1];

	const renderRoutes = () =>
		headerRoutes.map(({name, path}) => {
			const [isHovered, setHovered] = useState(false);

			const onMouseEnter = () => () => setHovered(true);
			const onMouseLeave = () => () => setHovered(false);

			return (
				<Link href={path} key={path}>
					<Route
						onMouseEnter={onMouseEnter()}
						onMouseLeave={onMouseLeave()}
						active={activeRoute.path === path}>
						<TopPointer active={activeRoute.path === path || isHovered} />
						<BottomPointer active={activeRoute.path === path || isHovered} />
						{name}
					</Route>
				</Link>
			);
		});

	return <Container>{renderRoutes()}</Container>;
};
