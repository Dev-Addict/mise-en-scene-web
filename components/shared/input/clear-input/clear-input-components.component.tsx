import styled, {css} from 'styled-components';

import {Size, StyledProps} from '../../../../types';

interface ContainerProps {
	size?: Size;
}

export const Container = styled.div<ContainerProps>`
	direction: rtl;
	font-size: ${({size = Size.MEDIUM}) =>
		16 + (Object.values(Size).findIndex((v) => v === size) - 2) * 2}px;
	width: 100%;
	flex: 1;
`;

export const Label = styled.div`
	margin-right: 10px;
`;

interface TextInputContainerProps {
	isFocus?: boolean;
	primary?: boolean;
	disabled?: boolean;
	editable?: boolean;
	size?: Size;
}

export const TextInputContainer = styled.div<
	StyledProps & TextInputContainerProps
>`
	width: 100%;
	display: flex;
	flex-direction: row;
	border-bottom: 2px solid ${({theme: {foreground}}) => foreground}4C;
	color: ${({theme: {foreground}}) => foreground};

	&::placeholder {
		color: ${({theme: {foreground}}) => foreground}66;
	}

	${({isFocus, theme: {accent, primary: primaryColor}, primary}) =>
		isFocus &&
		css`
			border-color: ${primary ? primaryColor : accent}4C;
		`}

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;
		`}
`;

interface ErrorProps {
	show?: boolean;
}

export const Error = styled.div<StyledProps & ErrorProps>`
	width: 100%;
	direction: rtl;
	color: ${({theme: {error}}) => error};
	font-size: 14px;

	${({show}) =>
		!show &&
		css`
			display: none;
		`}
`;

export const EditorContainer = styled(TextInputContainer)`
	& .DraftEditor-root {
		max-width: 100%;
		flex: 1;
		border: none;
		background-color: transparent;
		outline: none;
		font-size: ${({size = Size.MEDIUM}) =>
			16 + (Object.values(Size).findIndex((v) => v === size) - 2) * 2}px;
		user-select: auto;
		padding: 0 10px 8px 10px;

		&:disabled {
			opacity: 0.5;
		}

		& * {
			user-select: auto;
			z-index: 0;
		}
	}

	& .public-DraftEditorPlaceholder-root .public-DraftEditorPlaceholder-inner {
		color: ${({theme: {foreground}}) => foreground}80;
	}
`;
