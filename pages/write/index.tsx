import React, {useEffect} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import styled from 'styled-components';

import {Announce, Header} from '../../components';
import {Props} from '../../types';
import {useAuth, useWindowSize} from '../../hooks';

interface ContainerProps {
	height: number;
}

const Container = styled.div<ContainerProps>`
	width: 800px;
	margin: 10px auto;
	display: flex;
	flex-direction: column;

	@media only screen and (max-width: 1000px) {
		width: auto;
		margin: 10px 20px;
	}
`;

const Write: NextPage<Props> = ({setTheme}) => {
	const router = useRouter();

	const {isSigned, isLoading, user} = useAuth();

	const {height} = useWindowSize();

	const onAnnounce = () => () => router.push(`/users/${user?.username}`);

	useEffect(() => {
		if (!isLoading && !isSigned) router.push('/sign?callback=/write');
	}, []);

	return (
		<div>
			<Header setTheme={setTheme} />
			<Container height={height}>
				<Announce onAnnounce={onAnnounce()} />
			</Container>
		</div>
	);
};

export default Write;
