import React from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

import {DashboardRoutes} from './dashboard-routes.component';
import {Avatar} from '../../shared';
import {useAuth, useThemeImage} from '../../../hooks';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 10px 10px 10px;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
`;

const Exit = styled.div`
	width: 40px;
	height: 40px;
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}
`;

export const DashboardSide = () => {
	const exit = useThemeImage('/assets/icons/exit/exit-$mode.svg');

	const router = useRouter();

	const {signOut, user} = useAuth();

	const onExitClick = () => async () => {
		await router.push('/');

		signOut();
	};

	return (
		<Container>
			<div>
				<Link href={`/user/${user?.username}`}>
					<Avatar size={60} />
				</Link>
			</div>
			<DashboardRoutes />
			<Exit onClick={onExitClick()}>
				<Image src={exit} width={40} height={40} />
			</Exit>
		</Container>
	);
};
