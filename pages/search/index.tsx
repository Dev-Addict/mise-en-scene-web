import React from 'react';
import {NextPage} from 'next';
import styled from 'styled-components';

import {Header, Search} from '../../components';
import {Props} from '../../types';

const Body = styled.div`
	margin: auto;
	padding: 10px;
	width: 700px;

	@media only screen and (max-width: 800px) {
		width: auto;
	}
`;

const SearchPage: NextPage<Props> = ({setTheme}) => {
	return (
		<div>
			<Header setTheme={setTheme} />
			<Body>
				<Search initial />
			</Body>
		</div>
	);
};

export default SearchPage;
