import styled from 'styled-components';
import {StyledProps} from '../../../../types';

interface ContainerProps {
	width: number;
}

export const Container = styled.div<StyledProps & ContainerProps>`
	width: 100%;
	height: ${({width}) => (width / 3) * 2}px;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: 1fr;
	box-shadow: 3px 0 6px 0 ${({theme: {primary}}) => primary}29;
	border-radius: 10px;
	overflow: hidden;
`;

interface MainImageContainerProps {
	containerWidth: number;
}

export const MainImageContainer = styled.div<
	StyledProps & MainImageContainerProps
>`
	border: 1px solid ${({theme: {primary}}) => primary}4C;
	width: ${({containerWidth}) => containerWidth / 2}px;
	height: ${({containerWidth}) => (containerWidth / 3) * 2}px;
	overflow: hidden;
	border-radius: 0 10px 10px 0;
	position: relative;

	& > * {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateY(-50%);
	}
`;

interface SideContainerProps {
	containerWidth: number;
}

export const SideContainer = styled.div<StyledProps & SideContainerProps>`
	height: ${({containerWidth}) => (containerWidth / 3) * 2}px;
	display: grid;
	grid-template-rows: 1fr 1fr;
	grid-auto-columns: 1fr;
	border-radius: 10px 0 0 10px;
	overflow: hidden;

	& > *:first-child {
		border-top-left-radius: 10px;
	}

	& > *:last-child {
		border-bottom-left-radius: 10px;
		background-color: ${({theme: {link}}) => link}20;

		&:hover {
			opacity: 0.5;
			cursor: pointer;
		}
	}

	& > * {
		border: 1px solid ${({theme: {primary}}) => primary}4C;
		position: relative;
		overflow: hidden;

		& > * {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
`;

export const MoreContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
