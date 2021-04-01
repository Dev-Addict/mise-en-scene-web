import React, {ChangeEventHandler, FC, useEffect, useState} from 'react';
import Image from 'next/image';

import {Input} from '../input';
import {Poll} from '../../../../types';
import {useThemeImage} from '../../../../hooks';
import {Row} from '../../index';
import {Container, Plus} from './poll-input-components.component';
import {PollInputOption} from './poll-input-option.component';

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
	const close = useThemeImage('/assets/icons/close/close-$mode.svg');

	const [poll, setPoll] = useState<Poll>({
		question: '',
		options: [''],
	});

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
			<PollInputOption
				disabled={disabled}
				onChange={onOptionChange(i)}
				onCloseClick={onCloseOptionClick(i)}
				value={option}
				error={error?.options ? error.options[i] : undefined}
				touched={touched}
				index={i}
			/>
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
