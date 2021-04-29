import React, {FC} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled, {css} from 'styled-components';

import {useAuth, useThemeImage} from '../../../hooks';

interface NotificationContainerProps {
	mobile?: boolean;
	isSigned?: boolean;
}

const NotificationContainer = styled.div<NotificationContainerProps>`
	margin: 0 10px;
	display: none;

	${({mobile}) =>
		!mobile &&
		css`
			@media only screen and (max-width: 1000px) {
				display: none;
			}
		`}

	${({isSigned}) =>
		isSigned &&
		css`
			display: block;
		`}
`;

const Notification = styled.div`
	width: 25px;
	height: 25px;
	cursor: pointer;
	position: relative;

	&:hover {
		opacity: 0.5;
	}
`;

const Count = styled.div`
	position: absolute;
	bottom: 0;
	right: 0;
	background-color: ${({theme: {accent}}) => accent};
	border-radius: 50px;
	font-size: 10px;
	width: 15px;
	height: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`;

interface Props {
	mobile?: boolean;
}

export const Notifications: FC<Props> = ({mobile}) => {
	const bell = useThemeImage('/assets/icons/bell/bell-$mode.svg');
	const bellFill = useThemeImage('/assets/icons/bell-fill/bell-fill-$mode.svg');

	const {isSigned, user} = useAuth();

	return (
		<>
			<NotificationContainer mobile={mobile} isSigned={isSigned}>
				<Link href="/notifications">
					<Notification>
						<Image
							src={user?.notifications ? bellFill : bell}
							width={25}
							height={25}
						/>
						{!!user?.notifications && (
							<Count>
								{user?.notifications > 99 ? '99+' : user?.notifications}
							</Count>
						)}
					</Notification>
				</Link>
			</NotificationContainer>
		</>
	);
};
