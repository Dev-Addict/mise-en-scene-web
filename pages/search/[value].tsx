import React from 'react';
import {NextPage} from 'next';
import styled from 'styled-components';

import {Header, Search} from '../../components';
import {Props} from '../../types';
import {useRouter} from 'next/router';

const Body = styled.div`
	margin: auto;
	padding: 10px;
	width: 700px;

	@media only screen and (max-width: 800px) {
		width: auto;
	}
`;

const SearchPage: NextPage<Props> = ({setTheme}) => {
	const router = useRouter();
	const {value} = router.query;

	return (
		<div>
			<Header setTheme={setTheme} />
			<Body>
				<Search value={value as string} />
			</Body>
		</div>
	);
};

export default SearchPage;
