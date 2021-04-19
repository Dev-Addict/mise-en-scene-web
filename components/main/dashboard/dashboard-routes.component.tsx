import React from 'react';
import styled from 'styled-components';
import {dashboardRoutes} from '../../../data';
import {DashboardRoute} from './dashboard-route.component';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const DashboardRoutes = () => {
	const renderRoutes = () =>
		dashboardRoutes.map(({icon, name, route}) => (
			<DashboardRoute icon={icon} name={name} route={route} />
		));

	return <Container>{renderRoutes()}</Container>;
};
