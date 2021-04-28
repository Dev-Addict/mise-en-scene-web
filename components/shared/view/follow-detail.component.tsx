import React, {FC} from 'react';
import styled from 'styled-components';

import {Text} from '../text.component';
import {Filler, Row} from '../flex.component';
import {Size} from '../../../types';

const Container = styled(Row)`
	@media only screen and (max-width: 1000px) {
		width: 250px;
	}

	@media only screen and (max-width: 600px) {
		width: 100%;
	}
`;

interface Props {
	followers?: number;
	followings?: number;
	showFollowings?: boolean;
}

export const FollowDetail: FC<Props> = ({
	followings = 0,
	followers = 0,
	showFollowings = true,
}) => {
	return (
		<Container>
			<Text size={Size.SMALL} text={followers?.toString()} />
			<Text size={Size.SMALL} text=" " />
			<Text size={Size.SMALL} lowOpacity text="دنبال کننده" />
			<Filler />
			{showFollowings && (
				<>
					<Text size={Size.SMALL} text={followings?.toString()} />
					<Text size={Size.SMALL} text=" " />
					<Text size={Size.SMALL} lowOpacity text="دنبال می کند" />
				</>
			)}
		</Container>
	);
};
