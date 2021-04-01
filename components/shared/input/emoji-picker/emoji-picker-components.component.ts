import styled, {css} from 'styled-components';
import {StyledProps} from '../../../../types';

export const Container = styled.div`
	position: relative;
`;

interface EmojiProps {
	disabled?: boolean;
}

export const Emoji = styled.div<EmojiProps>`
	width: 40px;
	height: 40px;
	overflow: hidden;
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;
		`}
`;

interface PickerContainerProps {
	active?: boolean;
}

export const PickerContainer = styled.div<StyledProps & PickerContainerProps>`
	position: absolute;
	display: none;
	right: 50%;
	direction: rtl;

	& * {
		direction: rtl;
	}

	& .emoji-mart-preview-data {
		direction: ltr;
	}

	& .emoji-mart-anchor-bar {
		background-color: ${({theme: {primary}}) => primary} !important;
	}

	& .emoji-mart {
		border-color: ${({theme: {primary}}) => primary}4C;
		box-shadow: 3px 0 6px 0 ${({theme: {primary}}) => primary}29;
		background-color: ${({theme: {background}}) => background};
		line-height: 1;
	}

	& .emoji-mart-search input {
		border-color: ${({theme: {primary}}) => primary}4C !important;
		box-shadow: 3px 0 6px 0 ${({theme: {primary}}) => primary}29;
		background-color: ${({theme: {background}}) => background};
	}

	& .emoji-mart-category-label span {
		background-color: ${({theme: {background}}) => background};
	}

	& .emoji-mart-emoji::before {
		background-color: ${({theme: {primary}}) => primary}4C !important;
	}

	& .emoji-mart-skin-swatches {
		border-color: ${({theme: {primary}}) => primary}4C !important;
		box-shadow: 3px 0 6px 0 ${({theme: {primary}}) => primary}29;
		background-color: ${({theme: {background}}) => background} !important;
		padding: 5px;
	}

	${({active}) =>
		active &&
		css`
			display: block;
		`}
`;
