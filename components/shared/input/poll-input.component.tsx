import React, {ChangeEventHandler, FC, useEffect, useState} from 'react';
import Image from 'next/image';
import styled, {css} from 'styled-components';

import {Input} from './input';
import {Poll, StyledProps} from '../../../types';
import {useThemeImage} from '../../../hooks';
import {Row} from '..';

const Container = styled.div<StyledProps>`
	direction: rtl;
	border-right: 3px solid ${({theme: {foreground}}) => foreground}4C;
	padding-right: 10px;
`;

const Option = styled.div`
	display: flex;
	flex-direction: row;
`;

interface CloseProps {
	disabled?: boolean;
}

const Close = styled.div<CloseProps>`
	width: 24px;
	height: 24px;
	cursor: pointer;
	margin: 0 10px;

	&:hover {
		opacity: 0.5;
	}

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;
			cursor: default;
		`}
`;

interface PlusProps {
	disabled?: boolean;
}

const Plus = styled.div<PlusProps>`
	width: 24px;
	height: 24px;
	cursor: pointer;
	margin: 0 10px 20px;

	& > * {
		transform: rotate(45deg);
	}

	&:hover {
		opacity: 0.5;
	}

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;
			cursor: default;
		`}
`;

export interface PollError {
	question?: string;
	options?: string[];
}

interface Props {
	value?: Poll;
	disabled?: boolean;
	error?: PollError;
	touched?: boolean;
	onChange?: (poll: Poll) => void;
}

export const PollInput: FC<Props> = ({
	value,
	disabled,
	error,
	touched,
	onChange,
}) => {
	const [poll, setPoll] = useState<Poll>({
		question: '',
		options: [''],
	});

	const close = useThemeImage('/assets/icons/close/close-$mode.svg');

	const onPollChange = (poll: Poll) => {
		if (disabled) return;

		setPoll(poll);
		onChange && onChange(poll);
	};
	const onQuestionChange = (): ChangeEventHandler<HTMLInputElement> => ({
		target: {value},
	}) =>
		onPollChange({
			...poll,
			question: value,
		});
	const onOptionChange = (
		index: number
	): ChangeEventHandler<HTMLInputElement> => ({target: {value}}) => {
		const newPoll = {...poll};
		newPoll.options[index] = value;

		onPollChange(newPoll);
	};
	const onPlusClick = () => () =>
		onPollChange({...poll, options: [...poll.options, '']});
	const onCloseOptionClick = (index: number) => () => {
		if (index === 0) return;

		const newPoll = {...poll};
		newPoll.options.splice(index, 1);

		onPollChange(newPoll);
	};

	const renderOptions = () =>
		poll.options.map((option, i) => (
			<Option>
				<Close onClick={onCloseOptionClick(i)} disabled={disabled}>
					{i !== 0 && <Image src={close} width="24px" height="24px" />}
				</Close>
				<Input
					value={option}
					primary
					placeholder={`گزینه ${i + 1}`}
					showError
					touched={touched}
					error={error?.options ? error.options[i] : undefined}
					onChange={onOptionChange(i)}
					disabled={disabled}
				/>
			</Option>
		));

	useEffect(() => {
		if (value) setPoll(value);
	}, [value]);

	return (
		<Container>
			<Input
				showError
				error={error?.question}
				placeholder="سؤال"
				value={poll.question}
				onChange={onQuestionChange()}
				primary
				disabled={disabled}
			/>
			{renderOptions()}
			{poll.options.length < 10 && (
				<Row>
					<Plus onClick={onPlusClick()} disabled={disabled}>
						<Image src={close} width="24px" height="24px" />
					</Plus>
				</Row>
			)}
		</Container>
	);
};
