import styled, {css} from 'styled-components';

import {StyledProps} from '../../../../types';

interface ContainerProps {
	border?: boolean;
}

export const Container = styled.div<ContainerProps>`
	display: flex;
	flex-direction: row;
	direction: rtl;
	margin: 20px 0;
	padding: 10px 10px 0 10px;
	border-radius: 10px;

	${({border}) =>
		border &&
		css`
			border: 3px solid ${({theme: {foreground}}) => foreground};
		`}
`;

interface BodyProps {
	border?: boolean;
	reAnnouncement?: boolean;
}

export const Body = styled.div<StyledProps & BodyProps>`
	margin-right: 10px;
	padding: 10px;
	flex: 1;

	@media only screen and (max-width: 1000px) {
		margin: 0;
		${({reAnnouncement}) =>
			reAnnouncement &&
			css`
				padding: 0;
			`}
	}

	${({border}) =>
		border &&
		css`
			border-bottom: 3px solid ${({theme: {foreground}}) => foreground};
		`}
`;

interface UserDetailsProps {
	width?: number;
	reAnnouncement?: boolean;
}

export const UserDetails = styled.div<UserDetailsProps>`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 10px;
	white-space: nowrap;
	overflow: hidden;
	position: relative;

	& > *:not(:first-child):not(:last-child) {
		margin: 0 4px;
	}

	@media only screen and (max-width: 1000px) {
		max-width: ${({width}) => (width || 0) - 60}px;

		${({reAnnouncement, width}) =>
			reAnnouncement &&
			css`
				max-width: ${(width || 0) - 80}px;
			`}
	}
`;

export const LeftSideContainer = styled.div`
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	background-color: ${({theme: {background}}) => background};
	padding-right: 2px;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const SideAvatar = styled.div`
	@media only screen and (max-width: 1000px) {
		display: none;
	}
`;

export const SmallAvatar = styled.div`
	display: none;

	@media only screen and (max-width: 1000px) {
		display: inline-flex;
	}
`;
