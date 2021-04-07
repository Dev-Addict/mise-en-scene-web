import styled, {css} from 'styled-components';
import {Text} from '../../../text.component';

export const Viewer = styled.div`
	flex: 1;
	position: relative;
	overflow: hidden;
`;

export const CurrentImageContainer = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	overflow: auto;
`;

interface CurrentImageProps {
	width?: number;
	height?: number;
}

export const CurrentImage = styled.div<CurrentImageProps>`
	width: ${({width}) => width}px;
	height: ${({height}) => height}px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;

export const ZoomContainer = styled.div`
	position: absolute;
	bottom: 10px;
	right: 10px;
	background-color: ${({theme: {background}}) => background};
	border-radius: 50px;
	padding: 10px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	align-items: center;
`;

export const Zoom = styled(Text)`
	margin: 10px 0;
	text-align: center;
	width: 100%;
	border: 2px solid ${({theme: {foreground}}) => foreground};
	border-right: none;
	border-left: none;
	border-radius: 4px;
`;

interface ZoomControllerProps {
	rotate?: boolean;
	disabled?: boolean;
}

export const ZoomController = styled.div<ZoomControllerProps>`
	cursor: pointer;
	width: 20px;
	height: 20px;

	&:hover {
		opacity: 0.5;
	}

	${({rotate}) =>
		rotate &&
		css`
			transform: rotate(45deg);
		`}

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;
			cursor: default;
		`}
`;

interface CurrentImageControllerProps {
	disabled?: boolean;
}

export const CurrentImageController = styled.div<CurrentImageControllerProps>`
	width: 30px;
	height: 30px;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}

	${({disabled}) =>
		disabled &&
		css`
			cursor: default;
			opacity: 0.5;
		`}
`;

export const RightCurrentImageController = styled(CurrentImageController)`
	right: 10px;
`;

export const LeftCurrentImageController = styled(CurrentImageController)`
	left: 10px;
`;

export const Close = styled.div`
	width: 40px;
	height: 40px;
	position: absolute;
	top: 10px;
	right: 10px;
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}
`;
