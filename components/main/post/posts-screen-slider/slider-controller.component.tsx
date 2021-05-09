import React, {FC} from 'react';
import styled, {css} from 'styled-components';

const Container = styled.div`
	position: relative;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;

interface BarProps {
	active?: boolean;
	length?: number;
	index?: number;
}

const Bar = styled.div<BarProps>`
	flex: 1;
	margin: 10px 0;
	width: 5px;
	background-color: ${({theme: {background}}) => background}40;
	transition: all 336ms;
	cursor: pointer;

	${({active, length, index}) =>
		active &&
		css`
			flex: none;
			position: absolute;
			left: 0;
			top: calc((100% / ${length || 1}) * ${index || 0});
			height: calc((100% - ${((length || 1) + 1) * 20 - 20}px) / ${length});
			background-color: ${({theme: {background}}) => background}80;
			cursor: default;
		`}
`;

interface Props {
	length: number;
	active: number;
	moveToSlide?: (slide: number, duration?: number) => void;
}

export const SliderController: FC<Props> = ({length, active, moveToSlide}) => {
	const onBarClick = (index: number) => () => moveToSlide && moveToSlide(index);

	const renderBars = () =>
		new Array(length)
			.fill('')
			.map((_, i) => <Bar onClick={onBarClick(i)} key={i} />);

	return (
		<Container>
			{renderBars()}
			<Bar active length={length} index={active} />
		</Container>
	);
};
