import React, {Dispatch, FC, SetStateAction, useEffect} from 'react';
import {useRouter} from 'next/router';
import styled from 'styled-components';

import {useAuth} from '../../../hooks';
import {DashboardSide} from './dashboard-side.component';
import {Header} from '../header';
import {ThemeMode} from '../../../types';

const Container = styled.div`
	display: flex;
	flex-direction: row;
`;

const Body = styled.div`
	flex: 1;
	overflow-x: hidden;
	overflow-y: auto;
	margin-left: 80px;
`;

interface Props {
	setTheme: Dispatch<SetStateAction<ThemeMode>>;
}

export const Dashboard: FC<Props> = ({children, setTheme}) => {
	const router = useRouter();
	const {asPath} = router;

	const {isSigned, isLoading} = useAuth();

	useEffect(() => {
		if (!isLoading && !isSigned) router.push(`/sign?callback=${asPath}`);
	}, [isSigned, isLoading, asPath]);

	return (
		<Container>
			<Body>
				<Header setTheme={setTheme} sign={false} />
				{children}
			</Body>
			<DashboardSide />
		</Container>
	);
};
