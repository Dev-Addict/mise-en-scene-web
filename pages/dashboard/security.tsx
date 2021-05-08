import React from 'react';
import {NextPage} from 'next';
import styled from 'styled-components';

import {
	ChangeEmail,
	ChangePassword,
	Dashboard,
	VerifyEmail,
} from '../../components';
import {Props} from '../../types';

const Body = styled.div`
	width: 700px;
	margin: auto auto 80px;
	padding: 10px;

	@media only screen and (max-width: 800px) {
		width: auto;
	}
`;

const ActionContainer = styled.div`
	margin-bottom: 20px;
`;

const Security: NextPage<Props> = ({setTheme}) => {
	return (
		<Dashboard setTheme={setTheme}>
			<Body>
				<ActionContainer>
					<ChangePassword />
				</ActionContainer>
				<ActionContainer>
					<ChangeEmail />
				</ActionContainer>
				<ActionContainer>
					<VerifyEmail />
				</ActionContainer>
			</Body>
		</Dashboard>
	);
};

export default Security;
