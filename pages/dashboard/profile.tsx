import React from 'react';
import {NextPage} from 'next';
import styled from 'styled-components';

import {Dashboard, ProfileDetail} from '../../components';
import {Props} from '../../types';

const Body = styled.div`
	width: 700px;
	margin: auto auto 80px;

	@media only screen and (max-width: 800px) {
		width: auto;
	}
`;

const Profile: NextPage<Props> = ({setTheme}) => {
	return (
		<Dashboard setTheme={setTheme}>
			<Body>
				<ProfileDetail />
			</Body>
		</Dashboard>
	);
};

export default Profile;
