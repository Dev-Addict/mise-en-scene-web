import React, {FC} from 'react';
import styled from 'styled-components';

import {Filler, Row, Text} from '../../../shared';
import {Size, User} from '../../../../types';

const Container = styled(Row)`
	@media only screen and (max-width: 1000px) {
		width: 250px;
	}

	@media only screen and (max-width: 600px) {
		width: 100%;
	}
`;

interface Props {
	user: User;
}

export const UserFollowDetail: FC<Props> = ({user}) => {
	return (
		<Container>
			<Text size={Size.SMALL}>{user.followers}</Text>
			<Text size={Size.SMALL}>&nbsp;</Text>
			<Text size={Size.SMALL} lowOpacity>
				دنبال کننده
			</Text>
			<Filler />
			<Text size={Size.SMALL}>{user.followings}</Text>
			<Text size={Size.SMALL}>&nbsp;</Text>
			<Text size={Size.SMALL} lowOpacity>
				دنبال می کند
			</Text>
		</Container>
	);
};
