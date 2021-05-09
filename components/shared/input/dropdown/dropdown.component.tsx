import React, {FC, useEffect, useRef, useState} from 'react';
import styled, {css} from 'styled-components';
import {Text} from '../../text.component';

interface ContainerProps {
	open?: boolean;
	itemHeight?: number;
	length?: number;
}

const Container = styled.div<ContainerProps>`
	border: 3px solid ${({theme: {foreground}}) => foreground}80;
	width: 100%;
	height: ${({itemHeight = 0}) => itemHeight}px;
	overflow: hidden;
	border-radius: 10px;

	${({open, itemHeight = 0, length = 0}) =>
		open &&
		css`
			height: ${itemHeight * length}px;
			border-color: ${({theme: {primary}}) => primary};
			box-shadow: 3px 0 6px 0 ${({theme: {primary}}) => primary}29;
		`}
`;

const Option = styled.div`
	padding: 10px;
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}
`;

export interface DropdownOption {
	key: any;
	value: string;
	text: string;
}

interface Props {
	options: DropdownOption[];
	initialValue?: DropdownOption;
	onChange?: (option: DropdownOption) => void;
}

export const Dropdown: FC<Props> = ({options, initialValue, onChange}) => {
	const selectedOptionRef = useRef<HTMLDivElement>(null);

	const [selectedOption, setSelectedOption] = useState(
		initialValue ?? options[0]
	);
	const [isOpen, setOpen] = useState(false);

	const onOptionClick = (option: DropdownOption) => () => {
		setSelectedOption(option);
		onChange && onChange(option);
		setOpen(false);
	};
	const onSelectedOptionClick = () => () => {
		setOpen((open) => !open);
	};

	useEffect(() => {
		if (initialValue) setSelectedOption(initialValue);
	}, [initialValue]);

	const renderOptions = () =>
		options
			.filter((option) => option !== selectedOption)
			.map((option) => (
				<Option key={option.key} onClick={onOptionClick(option)}>
					<Text text={option.text} />
				</Option>
			));

	return (
		<Container
			open={isOpen}
			itemHeight={selectedOptionRef.current?.clientHeight}
			length={options.length}>
			<Option ref={selectedOptionRef} onClick={onSelectedOptionClick()}>
				<Text text={selectedOption?.text} />
			</Option>
			{renderOptions()}
		</Container>
	);
};
