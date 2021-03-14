import React, {FC, useRef, useState} from 'react';
import Image from 'next/image';
import {useThemeImage} from '../../../../hooks';
import {
	Container,
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
	type?: string;
	name?: string;
}

export const Input: FC<Props> = ({
	label,
	placeholder,
	icon,
	primary,
	type,
	name,
}) => {
	const [isFocus, setFocus] = useState(false);
	const [localType, setLocalType] = useState(type);

	const eye = useThemeImage(
		`/assets/icons/${
			localType === type ? 'eye/eye' : 'eye-strike/eye-strike'
		}-$mode.svg`
	);

	const textInputRef = useRef<HTMLInputElement>(null);

	const onFocus = () => () => setFocus(true);
	const onBlur = () => () => setFocus(false);
	const onTextInputContainerClick = () => () => textInputRef.current?.focus();
	const onEyeClick = () => () =>
		setLocalType(localType === 'password' ? 'text' : 'password');

	return (
		<Container>
			{label && <Label>{label}</Label>}
			<TextInputContainer
				isFocus={isFocus}
				onClick={onTextInputContainerClick()}
				primary={primary}>
				<TextInput
					placeholder={placeholder}
					icon={!!icon}
					onFocus={onFocus()}
					onBlur={onBlur()}
					ref={textInputRef}
					type={localType}
					autoComplete="off"
					name={name}
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
		</Container>
	);
};
