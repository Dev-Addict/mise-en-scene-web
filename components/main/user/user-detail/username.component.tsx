import React, {FC} from 'react';
import styled from 'styled-components';

import {useUserDisplayName} from '../../../../hooks';
import {Text} from '../../../shared';
import {Size, User} from '../../../../types';

const Container = styled.div`
	display: flex;
	flex-direction: column;

	@media only screen and (max-width: 1000px) {
		flex-direction: row;
		align-items: center;

		& > *:first-child {
			margin-left: 20px;
		}
	}

	@media only screen and (max-width: 600px) {
		justify-content: space-between;

		& > *:first-child {
			margin-left: 0;
		}
	}
`;

interface Props {
	user: User;
}

export const Username: FC<Props> = ({user}) => {
	const displayName = useUserDisplayName<User>(user);

	return (
		<Container>
			<Text size={Size.MASSIVE}>{displayName}</Text>
			<Text size={Size.MEDIUM} lowOpacity>
				@{user.username}
			</Text>
		</Container>
	);
};
