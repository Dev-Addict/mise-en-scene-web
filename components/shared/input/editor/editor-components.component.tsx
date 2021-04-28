import React, {FC} from 'react';
import {ContentBlock} from 'draft-js';
import styled, {css} from 'styled-components';

import {StyledProps} from '../../../../types';
import {Image} from '../../view';

export const blockRenderer = (block: ContentBlock) => {
	if (block.getType() === 'atomic')
		return {
			editable: false,
			component: EditorImage,
		};

	return null;
};

export const Container = styled.div`
	font-size: 18px;
	position: relative;
`;

interface EditorContainerProps {
	disabled?: boolean;
	readOnly?: boolean;
}

export const EditorContainer = styled.div<StyledProps & EditorContainerProps>`
	border-right: 3px solid ${({theme: {foreground}}) => foreground};
	padding: 10px;
	margin-right: 40px;
	flex: 1;
	background-color: transparent;
	outline: none;
	font-size: 18px;
	user-select: auto;

	&:disabled {
		opacity: 0.5;
	}

	& .DraftEditor-root {
		max-width: 100%;

		& * {
			user-select: auto;
			z-index: 0;
		}
	}

	& .public-DraftEditorPlaceholder-root .public-DraftEditorPlaceholder-inner {
		color: ${({theme: {foreground}}) => foreground}80;
		direction: rtl;
	}

	& .public-DraftEditor-content {
		min-height: 140px;
	}

	& * {
		user-select: auto;
	}

	${({readOnly}) =>
		readOnly &&
		css`
			border-right: none;
			padding: 0;
			margin: 0;

			& * {
				user-select: none;
			}
		`}
`;

export const InlineToolbarContainer = styled.div<StyledProps>`
	& > * {
		border: 2px solid ${({theme: {foreground}}) => foreground};
		box-shadow: none;
	}
`;

interface ControlContainerProps {
	disabled?: boolean;
}

export const ControlContainer = styled.div<StyledProps & ControlContainerProps>`
	width: 30px;
	height: 30px;
	border-radius: 15px;
	border: 2px solid ${({theme: {foreground}}) => foreground};
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	right: 0;

	&:hover {
		opacity: 0.5;
	}
`;

export const ImageControl = styled(ControlContainer)`
	bottom: 30px;
`;

const EditorImage: FC<any> = ({block, contentState}) => {
	const data = contentState.getEntity(block.getEntityAt(0)).getData();

	return <Image {...data} />;
};

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
