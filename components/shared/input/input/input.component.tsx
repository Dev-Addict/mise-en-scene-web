import React, {
	FC,
	FocusEventHandler,
	InputHTMLAttributes,
	useRef,
	useState,
} from 'react';
import Image from 'next/image';

import {useThemeImage} from '../../../../hooks';
import {
	Container,
	Error,
	Icon,
	Label,
	TextInput,
	TextInputContainer,
} from './input-components.component';

interface Props {
	label?: string;
	placeholder?: string;
	icon?: string;
	primary?: boolean;
	touched?: boolean;
	error?: string;
	showError?: boolean;
	editable?: boolean;
}

export const Input: FC<InputHTMLAttributes<HTMLInputElement> & Props> = ({
	label,
	icon,
	primary,
	type,
	name,
	onBlur,
	onFocus,
	showError = false,
	touched,
	error,
	disabled,
	editable = true,
	...props
}) => {
	const [isFocus, setFocus] = useState(false);
	const [localType, setLocalType] = useState(type);

	const eye = useThemeImage(
		`/assets/icons/${
			localType === type ? 'eye/eye' : 'eye-strike/eye-strike'
		}-$mode.svg`
	);

	const textInputRef = useRef<HTMLInputElement>(null);

	const onInputFocus: FocusEventHandler<HTMLInputElement> = (...args) => {
		setFocus(true);
		onFocus && onFocus(...args);
	};
	const onInputBlur: FocusEventHandler<HTMLInputElement> = (...args) => {
		setFocus(false);
		onBlur && onBlur(...args);
	};
	const onTextInputContainerClick = () => () => textInputRef.current?.focus();
	const onEyeClick = () => () =>
		setLocalType(localType === 'password' ? 'text' : 'password');

	return (
		<Container>
			{label && <Label>{label}</Label>}
			<TextInputContainer
				isFocus={isFocus}
				onClick={onTextInputContainerClick()}
				primary={primary}
				disabled={disabled || !editable}>
				<TextInput
					icon={!!icon}
					onFocus={onInputFocus}
					onBlur={onInputBlur}
					ref={textInputRef}
					type={localType}
					autoComplete="off"
					disabled={disabled || !editable}
					{...props}
				/>
				{icon && (
					<Icon>
						<Image src={icon} width="28px" height="28px" />
					</Icon>
				)}
				{type === 'password' && (
					<Icon onClick={onEyeClick()}>
						<Image src={eye} width="28px" height="28px" />
					</Icon>
				)}
			</TextInputContainer>
			<Error show={showError}>{(touched && error) || <>&nbsp;</>}</Error>
		</Container>
	);
};
