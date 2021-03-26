import React, {Dispatch, FC, SetStateAction} from 'react';
import styled from 'styled-components';

import {UserDetail} from './user-detail';
import {FindUserQueryDataFindUser} from '../../../api';

const Container = styled.div`
	margin: 20px 100px;
	display: flex;
	flex-direction: row;
	direction: rtl;

	@media only screen and (max-width: 1200px) {
		margin: 20px;
	}

	@media only screen and (max-width: 1000px) {
		flex-direction: column;
	}

	@media only screen and (max-width: 600px) {
		margin: 10px;
	}
`;

interface Props {
	user: FindUserQueryDataFindUser;
	setUser: Dispatch<SetStateAction<FindUserQueryDataFindUser | undefined>>;
}

export const User: FC<Props> = ({user, setUser}) => {
	return (
		<Container>
			<UserDetail user={user} setUser={setUser} />
		</Container>
	);
};
