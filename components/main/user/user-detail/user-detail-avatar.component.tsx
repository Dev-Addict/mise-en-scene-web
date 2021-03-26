import React, {FC} from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import {FindUserQueryDataFindUser} from '../../../../api';

const Avatar = styled.div`
	overflow: hidden;
	width: 150px;
	height: 150px;
	border-radius: 100px;
	border: 3px solid ${({theme: {link}}) => link};
`;

interface Props {
	user: FindUserQueryDataFindUser;
}

export const UserDetailAvatar: FC<Props> = ({user}) => {
	return (
		<Avatar>
			<Image
				src={`/image/user/avatar/${user.avatar}`}
				width="150px"
				height="150px"
				placeholder="/image/user/avatar/default.svg"
			/>
		</Avatar>
	);
};
