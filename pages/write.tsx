import React, {useEffect} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import {EditorState} from 'draft-js';
import styled from 'styled-components';

import {Header, WriteFields, WriteForm} from '../components';
import {Props} from '../types';
import {useAuth, useWindowSize} from '../hooks';

interface ContainerProps {
	height: number;
}

const Container = styled.div<ContainerProps>`
	width: 1000px;
	height: ${({height}) => height - 80}px;
	margin: auto;
	display: flex;
	flex-direction: column;
`;

const initialValues: WriteFields = {
	text: EditorState.createEmpty(),
	gif: undefined,
	poll: undefined,
	publishAt: undefined,
	gallery: undefined,
};

const Write: NextPage<Props> = ({setTheme}) => {
	const router = useRouter();

	const {isSigned, isLoading} = useAuth();

	const {height} = useWindowSize();

	useEffect(() => {
		if (!isLoading && !isSigned) router.push('/sign?callback=/write');
	}, []);

	return (
		<div>
			<Header setTheme={setTheme} />
			<Container height={height}>
				<WriteForm
					onSubmit={() => {}}
					errors={[]}
					initialValues={initialValues}
				/>
			</Container>
		</div>
	);
};

export default Write;
