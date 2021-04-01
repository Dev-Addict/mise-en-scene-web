import React, {FC, useEffect, useRef, useState} from 'react';

import {Container, Item, Selected} from './switch-components.component';
import {Color} from '../../../../data';

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
