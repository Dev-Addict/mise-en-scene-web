import React, {ChangeEventHandler, FC} from 'react';
import {Close, Option} from './poll-input-components.component';
import Image from 'next/image';
import {Input} from '../input';
import {useThemeImage} from '../../../../hooks';

interface Props {
	onCloseClick?: () => void;
	index?: number;
	disabled?: boolean;
	value?: string;
	touched?: boolean;
	error?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const PollInputOption: FC<Props> = ({
	onCloseClick,
	index,
	disabled,
	...props
}) => {
	const close = useThemeImage('/assets/icons/close/close-$mode.svg');

	return (
		<Option>
			<Close onClick={onCloseClick} disabled={disabled}>
				{index !== 0 && <Image src={close} width="24px" height="24px" />}
			</Close>
			<Input
				primary
				placeholder={`گزینه ${(index || 0) + 1}`}
				showError
				disabled={disabled}
				{...props}
			/>
		</Option>
	);
};
