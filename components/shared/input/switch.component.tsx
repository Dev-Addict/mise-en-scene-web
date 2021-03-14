import React, {FC, useEffect, useRef, useState} from 'react';
import styled, {css} from 'styled-components';

import {StyledProps} from '../../../types';
import {Color} from '../../../data';

interface ContainerProps {
	circular?: boolean;
	primary?: boolean;
}

const Container = styled.div<StyledProps & ContainerProps>`
	border-radius: 4px;
	background-color: ${({theme: {accent}}) => accent};
	overflow: hidden;
	position: relative;
	padding: 0 1px;

	${({circular}) =>
		circular &&
		css`
			border-radius: 50px;
		`}

	${({primary}) =>
		primary &&
		css`
			background-color: ${({theme: {primary}}) => primary};
		`}
`;

interface ItemProps {
	unselectedItemColor?: Color;
	isSelected?: boolean;
}

const Item = styled.div<StyledProps & ItemProps>`
	display: inline-block;
	padding: 10px 20px;
	z-index: 1;
	position: relative;
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}

	${({isSelected, unselectedItemColor}) =>
		!isSelected &&
		css`
			color: ${unselectedItemColor};
		`}
`;

interface SelectedProps {
	width?: number;
	left?: number;
	circular?: boolean;
	primary?: boolean;
}

const Selected = styled.div<StyledProps & SelectedProps>`
	position: absolute;
	border-radius: 4px;
	width: ${({width}) => width}px;
	left: ${({left}) => (left || 0) - 1}px;
	background-color: ${({theme: {background}}) => background};
	margin: 1px;
	top: 1px;
	bottom: 1px;

	${({circular}) =>
		circular &&
		css`
			border-radius: 50px;
		`}
`;

export interface SwitchItem {
	value: string;
	key: string;
	text: string;
}

interface Props {
	items: SwitchItem[];
	onClick?: (item: SwitchItem) => void;
	value?: string;
	circular?: boolean;
	primary?: boolean;
	unselectedItemColor?: Color;
}

export const Switch: FC<Props> = ({
	items,
	onClick,
	value,
	unselectedItemColor,
	...props
}) => {
	const selectedItemRef = useRef<HTMLDivElement>(null);

	const [width, setWidth] = useState(0);

	const onItemClick = (item: SwitchItem) => () => onClick && onClick(item);

	const renderItems = () =>
		items.map((item) => {
			const isSelected = item.value === value;

			return (
				<Item
					key={item.key}
					onClick={onItemClick(item)}
					isSelected={isSelected}
					unselectedItemColor={unselectedItemColor}
					ref={isSelected ? selectedItemRef : undefined}>
					{item.text}
				</Item>
			);
		});

	useEffect(() => {
		setWidth(selectedItemRef.current?.clientWidth || 0);
	}, [selectedItemRef.current, value]);

	return (
		<Container {...props}>
			<Selected
				width={width}
				left={selectedItemRef.current?.offsetLeft}
				{...props}
			/>
			{renderItems()}
		</Container>
	);
};
