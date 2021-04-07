import React, {FC} from 'react';
import Link from 'next/link';
import styled, {css} from 'styled-components';

import {useAuth} from '../../../hooks';
import {Avatar, Button} from '../../shared';
import {Color} from '../../../data';

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

interface Props {
	mobile?: boolean;
}

export const Sign: FC<Props> = ({mobile}) => {
	const {isSigned, user} = useAuth();

	return (
		<Link href={isSigned ? `/users/${user?.username}` : '/sign'}>
			{isSigned ? (
				<SignContainer mobile={mobile}>
					<Avatar size={60} />
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
