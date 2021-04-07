import React, {FC, useEffect, useState} from 'react';
import Image from 'next/image';
import styled, {css} from 'styled-components';

import {useThemeImage} from '../../../../hooks';
import {Gifs} from './gifs.component';
import {GifResult} from '../../../../api';

const Container = styled.div`
	position: relative;
`;

interface GifProps {
	disabled?: boolean;
}

const Gif = styled.div<GifProps>`
	width: 40px;
	height: 40px;
	overflow: hidden;
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;
		`}
`;

interface GifsContainerProps {
	active?: boolean;
}

const GifsContainer = styled.div<GifsContainerProps>`
	position: absolute;
	display: none;
	right: 50%;
	direction: rtl;
	z-index: 20;

	${({active}) =>
		active &&
		css`
			display: block;
		`}
`;

interface Props {
	onSelect?: (gif: GifResult) => void;
	disabled?: boolean;
}

export const GifSelector: FC<Props> = ({onSelect, disabled}) => {
	const [isActive, setActive] = useState(false);

	const gif = useThemeImage('/assets/icons/gif/gif-$mode.svg');

	const onGifClick = () => () =>
		!disabled && setActive((isActive) => !isActive);

	useEffect(() => {
		if (disabled) setActive(false);
	}, [disabled]);

	return (
		<Container>
			<Gif onClick={onGifClick()} disabled={disabled}>
				<Image src={gif} width="40px" height="40px" />
			</Gif>
			<GifsContainer active={isActive}>
				<Gifs onSelect={onSelect} />
			</GifsContainer>
		</Container>
	);
};
