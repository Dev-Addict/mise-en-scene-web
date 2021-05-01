import React, {FC} from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import {SearchInput} from './search-input.component';
import {useThemeImage, useWindowSize} from '../../../hooks';

interface IllustrationProps {
	height: number;
}

const Illustration = styled.div<IllustrationProps>`
	width: 100%;
	height: ${({height}) => height - 240}px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

interface Props {
	initial?: boolean;
	value?: string;
}

export const Search: FC<Props> = ({initial, value}) => {
	const search = useThemeImage('/assets/illustrations/search/search-$mode.svg');
	const empty = useThemeImage('/assets/illustrations/empty/empty-$mode.svg');

	const {width, height} = useWindowSize();

	const size = Math.min(width - 20, 680, height - 240);

	return (
		<div>
			<SearchInput value={value} />
			<Illustration height={height}>
				<Image src={initial ? search : empty} width={size} height={size} />
			</Illustration>
		</div>
	);
};
