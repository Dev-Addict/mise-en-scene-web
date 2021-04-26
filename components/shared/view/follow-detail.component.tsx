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
			<Text size={Size.SMALL}>{followers}</Text>
			<Text size={Size.SMALL}>&nbsp;</Text>
			<Text size={Size.SMALL} lowOpacity>
				دنبال کننده
			</Text>
			<Filler />
			{showFollowings && (
				<>
					<Text size={Size.SMALL}>{followings}</Text>
					<Text size={Size.SMALL}>&nbsp;</Text>
					<Text size={Size.SMALL} lowOpacity>
						دنبال می کند
					</Text>
				</>
			)}
		</Container>
	);
};
