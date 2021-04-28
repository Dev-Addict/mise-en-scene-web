import React, {FC} from 'react';
import {
	BoldButton,
	HeadlineOneButton,
	HeadlineThreeButton,
	HeadlineTwoButton,
	ItalicButton,
	OrderedListButton,
	UnderlineButton,
	UnorderedListButton,
} from '@draft-js-plugins/buttons';
import {ToolbarChildrenProps} from '@draft-js-plugins/inline-toolbar/lib/components/Toolbar';
import styled from 'styled-components';

import {StyledProps} from '../../../../types';

const Container = styled.div<StyledProps>`
	background-color: ${({theme: {background}}) => background};
	border: none;
	box-shadow: none;

	& > * > * {
		background-color: ${({theme: {background}}) => background};
	}

	& * {
		border-color: ${({theme: {foreground}}) => foreground};
		color: ${({theme: {foreground}}) => foreground};

		& svg {
			fill: ${({theme: {foreground}}) => foreground};
		}
	}
`;

export const InlineToolbarContent: FC<ToolbarChildrenProps> = (props) => {
	const buttons = [
		BoldButton,
		ItalicButton,
		UnderlineButton,
		HeadlineOneButton,
		HeadlineTwoButton,
		HeadlineThreeButton,
		OrderedListButton,
		UnorderedListButton,
	];

	const renderButtons = () =>
		buttons.map((Component, i) => <Component key={i} {...props} />);

	return <Container>{renderButtons()}</Container>;
};
