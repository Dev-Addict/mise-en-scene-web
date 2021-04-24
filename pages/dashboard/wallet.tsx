import React from 'react';
import {NextPage} from 'next';
import styled from 'styled-components';

import {ComingSoon, Dashboard} from '../../components';
import {Props} from '../../types';

const Body = styled.div`
	width: 700px;
	margin: auto auto 80px;
	padding: 10px;

	@media only screen and (max-width: 800px) {
		width: auto;
	}
`;

const Security: NextPage<Props> = ({setTheme}) => {
	return (
		<Dashboard setTheme={setTheme}>
			<ComingSoon />
		</Dashboard>
	);
};

export default Security;
