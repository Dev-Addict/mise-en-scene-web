import React, {Dispatch, FC, SetStateAction} from 'react';
import styled from 'styled-components';

import {UserDetailBody} from './user-detail-body.component';
import {FindUserQueryDataFindUser} from '../../../../api';
import {Avatar} from '../../../shared';

const UserDetailContainer = styled.div`
	width: 250px;
	display: flex;
	flex-direction: column;

	@media only screen and (max-width: 1000px) {
		flex-direction: row;
		width: 100%;
	}

	@media only screen and (max-width: 600px) {
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
`;

interface Props {
	user: FindUserQueryDataFindUser;
	setUser: Dispatch<SetStateAction<FindUserQueryDataFindUser | undefined>>;
}

export const UserDetail: FC<Props> = ({user, setUser}) => {
	return (
		<UserDetailContainer>
			<Avatar user={user as any} size={150} />
			<UserDetailBody user={user} setUser={setUser} />
		</UserDetailContainer>
	);
};