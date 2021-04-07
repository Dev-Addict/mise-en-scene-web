import styled from 'styled-components';
import {StyledProps} from '../../../../types';

export const Container = styled.div<StyledProps>`
	width: 324px;
	direction: rtl;
	font-size: 16px;
	border-radius: 5px;
	box-shadow: 3px 0 6px 0 ${({theme: {primary}}) => primary}29;
	border: 1px solid ${({theme: {primary}}) => primary}4C;
	background-color: ${({theme: {background}}) => background};
	margin-bottom: 10px;
`;

export const InputContainer = styled.div`
	padding: 10px 0;

	& > * {
		width: 100%;
	}
`;

export const Main = styled.div`
	height: 360px;
	border-radius: 0 0 5px 5px;
	overflow-x: hidden;
	overflow-y: auto;
`;

export const GifsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: 1fr;
`;

export const Gif = styled.div`
	position: relative;
	height: 152px;
	overflow: hidden;

	& > div:last-child {
		opacity: 0;
	}

	&:hover {
		box-shadow: 3px 0 6px 0 ${({theme: {primary}}) => primary}29;

		& > div:last-child {
			opacity: 1;
		}
	}
`;

export const GifData = styled.div<StyledProps>`
	width: 100%;
	position: absolute;
	bottom: 5px;
	text-align: center;
	background-color: ${({theme: {background}}) => background}80;
	color: ${({theme: {foreground}}) => foreground};
	font-size: 12px;
`;

export const MessageContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px;
	font-size: 16px;
`;
