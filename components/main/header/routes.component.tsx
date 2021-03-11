import React from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';

import {Route} from './route.component';
import {headerRoutes} from '../../../data';
import {StyledProps} from '../../../types';

const Container = styled.div<StyledProps>`
	display: flex;
	flex-direction: row;
	align-items: center;

	@media only screen and (max-width: 1000px) {
		width: 100%;
		flex-direction: column;
	}
`;

export const Routes = () => {
	const {pathname} = useRouter();

	const activeRoutes = headerRoutes.filter(({path}) =>
		pathname.startsWith(path)
	);
	const activePath = activeRoutes[activeRoutes.length - 1].path;

	const renderRoutes = () =>
		headerRoutes.map((route) => <Route {...route} activePath={activePath} />);

	return <Container>{renderRoutes()}</Container>;
};
