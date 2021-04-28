import React, {FC, useEffect, useState} from 'react';

import {Text} from '../../text.component';
import {Size} from '../../../../types';
import {
	Box,
	CheckBoxContainer,
	CheckedBox,
	CheckMark,
	Container,
	Error,
} from './check-box-components.component';

interface Props {
	value?: boolean;
	onChange?: (value: boolean) => void;
	text?: string;
	touched?: boolean;
	error?: string;
	showError?: boolean;
	disabled?: boolean;
}

export const CheckBox: FC<Props> = ({
	value = false,
	onChange,
	text,
	touched = false,
	error,
	showError = false,
	disabled,
}) => {
	const [localValue, setLocalValue] = useState(value);

	const onBoxClick = () => () => {
		setLocalValue(!localValue);

		onChange && onChange(!localValue);
	};

	useEffect(() => {
		setLocalValue(value);
	}, [value]);

	return (
		<Container>
			<CheckBoxContainer>
				<Box onClick={onBoxClick()} disabled={disabled}>
					<CheckedBox checked={localValue}>
						<CheckMark />
					</CheckedBox>
				</Box>
				<Text size={Size.LARGE} text={text} />
			</CheckBoxContainer>
			<Error show={showError}>{(touched && error) || <>&nbsp;</>}</Error>
		</Container>
	);
};

export type CheckBoxProps = Props;
