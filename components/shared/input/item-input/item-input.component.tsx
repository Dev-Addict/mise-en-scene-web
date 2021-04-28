import React, {
	ChangeEventHandler,
	FC,
	FocusEventHandler,
	InputHTMLAttributes,
	KeyboardEventHandler,
	useEffect,
	useRef,
	useState,
} from 'react';
import Image from 'next/image';

import {
	Container,
	Error,
	Item,
	Label,
	TextInput,
	TextInputContainer,
} from './item-input-components.component';

interface Props
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	label?: string;
	placeholder?: string;
	primary?: boolean;
	touched?: boolean;
	error?: string;
	showError?: boolean;
	editable?: boolean;
	value?: string[];
	onChange?: (items: string[]) => void;
	unique?: boolean;
}

export const ItemInput: FC<Props> = ({
	label,
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
	value,
	onChange,
	unique,
	...props
}) => {
	const [isFocus, setFocus] = useState(false);
	const [items, setItems] = useState<string[]>(value || []);
	const [inputValue, setInputValue] = useState('');

	const textInputRef = useRef<HTMLInputElement>(null);

	const onInputFocus = (): FocusEventHandler<HTMLInputElement> => (...args) => {
		setFocus(true);
		onFocus && onFocus(...args);
	};
	const onInputBlur = (): FocusEventHandler<HTMLInputElement> => (...args) => {
		setFocus(false);
		onBlur && onBlur(...args);
	};
	const onTextInputContainerClick = () => () => textInputRef.current?.focus();
	const onInputChange = (): ChangeEventHandler<HTMLInputElement> => ({
		target: {value},
	}) => !disabled && setInputValue(value);
	const onKeyDown = (): KeyboardEventHandler<HTMLInputElement> => (event) => {
		if (disabled) return;

		const {keyCode} = event;

		if (keyCode === 13 && inputValue) {
			event.preventDefault();

			if (unique && items.includes(inputValue)) return;

			setInputValue('');

			const newItems = [...items, inputValue];

			setItems(newItems);
			onChange && onChange(newItems);
		}
		if (keyCode === 8 && !inputValue) {
			const newItems = items.splice(0, items.length - 1);

			setItems(newItems);
			onChange && onChange(newItems);
		}
	};
	const onItemClick = (index: number) => () => {
		const newItems = [...items];
		newItems.splice(index, 1);

		setItems(newItems);
		onChange && onChange(newItems);
	};

	useEffect(() => {
		setItems(items || []);
	}, [items]);

	const renderItems = () =>
		items.map((item, i) => (
			<Item key={item} onClick={onItemClick(i)} disabled={disabled}>
				{item}
				<Image
					src={'/assets/icons/close/close-dark.svg'}
					width={10}
					height={10}
				/>
			</Item>
		));

	return (
		<Container>
			{label && <Label>{label}</Label>}
			<TextInputContainer
				isFocus={isFocus}
				onClick={onTextInputContainerClick()}
				primary={primary}
				disabled={disabled || !editable}>
				{renderItems()}
				<TextInput
					onFocus={onInputFocus()}
					onBlur={onInputBlur()}
					onKeyDown={onKeyDown()}
					ref={textInputRef}
					autoComplete="off"
					disabled={disabled || !editable}
					type={type}
					{...props}
					onChange={onInputChange()}
					value={inputValue}
				/>
			</TextInputContainer>
			<Error show={showError}>{(touched && error) || <>&nbsp;</>}</Error>
		</Container>
	);
};
