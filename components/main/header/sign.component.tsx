import React, {FC} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled, {css} from 'styled-components';

import {useAuth} from '../../../hooks';
import {Button} from '../../shared';
import {Color} from '../../../data';
import {StyledProps} from '../../../types';

interface SignContainerProps {
	mobile?: boolean;
}

const SignContainer = styled.a<SignContainerProps>`
	margin-right: 10px;

	${({mobile}) =>
		!mobile &&
		css`
			@media only screen and (max-width: 1000px) {
				display: none;
			}
		`}
`;

const Avatar = styled.div<StyledProps>`
	width: 60px;
	height: 60px;
	border-radius: 30px;
	overflow: hidden;
	border: 3px solid ${({theme: {link}}) => link};
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}
`;

interface Props {
	mobile?: boolean;
}

export const Sign: FC<Props> = ({mobile}) => {
	const {isSigned, user} = useAuth();

	return (
		<Link href={isSigned ? `/users/${user?.username}` : '/sign'}>
			{isSigned ? (
				<SignContainer mobile={mobile}>
					<Avatar>
						<Image
							src={`/image/user/avatar/${user?.avatar || 'default.svg'}`}
							width="60px"
							height="60px"
							placeholder="/image/user/avatar/default.svg"
						/>
					</Avatar>
				</SignContainer>
			) : (
				<Link href="/sign">
					<SignContainer mobile={mobile}>
						<Button circular color={Color.GHOST_WHITE} primary>
							ورود/ثبت نام
						</Button>
					</SignContainer>
				</Link>
			)}
		</Link>
	);
};
