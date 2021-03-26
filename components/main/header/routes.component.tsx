import React, {Dispatch, FC, SetStateAction} from 'react';
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

interface Props {
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export const Routes: FC<Props> = (props) => {
	const {pathname} = useRouter();

	const renderRoutes = () =>
		headerRoutes.map((route) => (
			<Route {...route} {...props} activePath={pathname} key={route.path} />
		));

	return <Container>{renderRoutes()}</Container>;
};
