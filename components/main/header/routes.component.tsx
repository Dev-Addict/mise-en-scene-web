import React, {useState} from 'react';
import Link from 'next/link';
import styled, {css} from 'styled-components';

import {headerRoutes} from '../../../data';
import {useRouter} from 'next/router';
import {Theme} from '../../../types';

const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const Route = styled.a`
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
					<Route onMouseEnter={onMouseEnter()} onMouseLeave={onMouseLeave()}>
						<TopPointer active={activeRoute.path === path || isHovered} />
						<BottomPointer active={activeRoute.path === path || isHovered} />
						{name}
					</Route>
				</Link>
			);
		});

	return <Container>{renderRoutes()}</Container>;
};
