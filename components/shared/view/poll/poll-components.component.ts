import styled, {css} from 'styled-components';
import {StyledProps} from '../../../../types';
import {Text} from '../../text.component';

export const Container = styled.div<StyledProps>`
	padding: 10px 10px 0 10px;
`;

export const OptionContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

interface OptionVotesProps {
	voted?: boolean;
}

export const OptionVotes = styled(Text)<OptionVotesProps>`
	width: 40px;
	display: none;

	${({voted}) =>
		voted &&
		css`
			display: inline-block;
			margin-left: 10px;
		`}
`;

interface OptionProps {
	disabled?: boolean;
	voted?: boolean;
}

export const Option = styled.div<OptionProps>`
	padding: 10px 20px;
	border-radius: 10px;
	border: 2px solid ${({theme: {foreground}}) => foreground}4C;
	margin: 10px 0 0 0;
	cursor: pointer;
	overflow: hidden;
	position: relative;
	direction: rtl;
	flex: 1;

	&:hover {
		border-color: ${({theme: {primary}}) => primary}4C;
		box-shadow: 3px 0 6px 0 ${({theme: {primary}}) => primary}29;
		opacity: 0.5;
	}

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;
			cursor: default;
		`}

	${({voted}) =>
		voted &&
		css`
			border: 2px solid ${({theme: {primary}}) => primary}80;
			cursor: default;

			&:hover {
				border-color: ${({theme: {primary}}) => primary}80;
				box-shadow: none;
				opacity: 1;
			}
		`}
`;

interface OptionBarProps {
	voted?: boolean;
	votePercentage?: number;
	myVote?: boolean;
}

export const OptionBar = styled.div<StyledProps & OptionBarProps>`
	position: absolute;
	height: 100%;
	background-color: ${({theme: {primary}}) => primary}${({myVote}) => (myVote ? '80' : '29')};
	right: 0;
	top: 0;

	${({voted, votePercentage}) =>
		voted &&
		css`
			width: ${votePercentage}%;
		`}
`;

export const Votes = styled(Text)`
	display: inline-block;
	margin-top: 10px;
`;
