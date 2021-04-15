import React, {FC, useEffect, useRef, useState} from 'react';

import {SelectItem} from '../select.component';
import {useComponentSize} from '../../../../../hooks';
import {Container, Error, Label} from '../../input/input-components.component';
import {
	Item,
	ItemContainer,
	ItemsContainer,
} from './open-select-components.component';

const calculateItemPerLine = (
	containerWidth: number,
	minItemWidth: number,
	length: number
) => {
	let itemPerLine = Math.floor(containerWidth / minItemWidth) || 1;

	while (length % itemPerLine !== 0) itemPerLine -= 1;

	return itemPerLine;
};

interface Props {
	items?: SelectItem[];
	minItemWidth?: number;
	label?: string;
	touched?: boolean;
	error?: string;
	showError?: boolean;
	editable?: boolean;
	value?: any;
	onChange?: (value: any) => void;
	disabled?: boolean;
}

export const OpenSelect: FC<Props> = ({
	items = [],
	minItemWidth = 200,
	label,
	showError,
	touched,
	error,
	value,
	onChange,
	disabled,
}) => {
	const [localValue, setLocalValue] = useState(value);

	const containerRef = useRef<HTMLDivElement>(null);

	const {width} = useComponentSize(containerRef);

	const itemPerLine = calculateItemPerLine(width, minItemWidth, items.length);

	const onValueChange = (value: any) => () => {
		setLocalValue(value);
		onChange && onChange(value);
	};

	const renderItems = () =>
		items.map(({key, value, text}, i) => {
			const rightEdge = i % itemPerLine === 0;
			const leftEdge = i % itemPerLine === itemPerLine - 1;

			return (
				<ItemContainer key={key} rightEdge={rightEdge} leftEdge={leftEdge}>
					<Item
						active={value === localValue}
						onClick={onValueChange(value)}
						disabled={disabled}>
						{text}
					</Item>
				</ItemContainer>
			);
		});

	useEffect(() => {
		setLocalValue(value);
	}, [value]);

	return (
		<Container>
			{label && <Label>{label}</Label>}
			<ItemsContainer ref={containerRef} itemPerLine={itemPerLine}>
				{renderItems()}
			</ItemsContainer>
			<Error show={showError}>{(touched && error) || <>&nbsp;</>}</Error>
		</Container>
	);
};

export type OpenSelectProps = Props;
