import React, {FC, ReactNode, useRef, useState} from 'react';
import styled, {css} from 'styled-components';
import {useComponentSize} from 'hooks';

export const Container = styled.div`
	direction: ltr;
	position: relative;
	cursor: pointer;
	z-index: 2;
`;

interface SideProps {
	active?: boolean;
	viewWidth?: number;
}

export const Side = styled.div<SideProps>`
	direction: rtl;
	position: absolute;
	top: 50%;
	left: ${({viewWidth}) => (viewWidth || 0) + 10}px;
	transform: translateY(-50%);
	white-space: nowrap;
	display: inline-block;
	z-index: 1;

	${({active = true}) =>
		!active &&
		css`
			opacity: 0;
			left: 0;
		`}
`;

const ViewContainer = styled.div`
	display: inline-block;
`;

interface Props {
	view?: ReactNode;
	message?: string;
	action?: () => any | Promise<any>;
}

export const SlideMessage: FC<Props> = ({view, message, action}) => {
	const [show, setShow] = useState(false);

	const viewRef = useRef<HTMLDivElement>(null);

	const {width} = useComponentSize(viewRef);

	const onClick = () => async () => {
		const result = action && (await action());

		if (!result) return;

		setShow(true);

		const timeoutId = setTimeout(() => {
			setShow(false);
		}, 3000);

		return () => clearTimeout(timeoutId);
	};

	return (
		<Container onClick={onClick()}>
			<ViewContainer ref={viewRef}>{view}</ViewContainer>
			<Side active={show} viewWidth={width}>
				<div>{message}</div>
			</Side>
		</Container>
	);
};
