import React, {FC} from 'react';
import styled from 'styled-components';

import {User} from '../../../types';
import {useAuth} from '../../../hooks';
import Link from 'next/link';

interface ContainerProps {
	size: number;
	src: string;
}

const Container = styled.div<ContainerProps>`
	width: ${({size}) => size}px;
	height: ${({size}) => size}px;
	overflow: hidden;
	cursor: pointer;
	border: 3px solid ${({theme: {link}}) => link};
	border-radius: ${({size}) => size / 2}px;
	background-image: url('${({src}) => src}');
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;

	&:hover {
		opacity: 0.5;
	}
`;

interface Props {
	user?: User;
	size?: number;
	src?: string;
}

export const Avatar: FC<Props> = ({user, size = 200, src}) => {
	const {user: authUser} = useAuth();

	const localUser = user || authUser;

	return (
		<Link href={`/users/${localUser?.username || 'no'}`}>
			<Container
				size={size}
				src={`/image/user/avatar/${src || localUser?.avatar || 'default.svg'}`}
			/>
		</Link>
	);
};
