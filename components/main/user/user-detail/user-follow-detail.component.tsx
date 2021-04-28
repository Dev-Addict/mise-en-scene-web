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
			<Text size={Size.SMALL} text={user.followers?.toString()} />
			<Text size={Size.SMALL} text=" " />
			<Text size={Size.SMALL} lowOpacity text="دنبال کننده" />
			<Filler />
			<Text size={Size.SMALL} text={user.followings?.toString()} />
			<Text size={Size.SMALL} text=" " />
			<Text size={Size.SMALL} lowOpacity text="دنبال می کند" />
		</Container>
	);
};
